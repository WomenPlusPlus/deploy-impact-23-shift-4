# from .train_model import vectorizer
import dill
import requests
import string
import numpy as np
from flask import Blueprint, jsonify, request
from sklearn.metrics.pairwise import cosine_similarity

with open("model/vectorizer.pkl", "rb") as file:
    vectorizer = dill.load(file)


def score(job_skills, candidate_skills, candidate_levels=False):
    job_skills = ["_".join(skill.lower().split(" ")) for skill in job_skills]
    job_skills_vector = vectorizer.transform(job_skills)
    # candidate_skills, candidate_levels = zip(*candidate_skills_dict.items())    
    candidate_skills = [
        "_".join(skill.lower().split(" ")) for skill in candidate_skills
    ]
    candidate_skills_vector = vectorizer.transform(candidate_skills)
    similarity_matrix = cosine_similarity(candidate_skills_vector, job_skills_vector)
    similarity_matrix_resolved = (similarity_matrix > 0.7).astype("int32")
    
    if candidate_levels:
        skills_dict = {"beginner": 1, "intermediate": 2, "advanced": 3, "pro": 4}
        candidate_levels = [[skills_dict[level]] for level in candidate_levels]
        total_score = 4 * len(job_skills)
        candidate_score = np.multiply(similarity_matrix_resolved, candidate_levels).sum()
        percent_score = (candidate_score / total_score) * 100
    else:
        percent_score = similarity_matrix_resolved.sum() / len(job_skills)
    return round(percent_score, 1)


def match_candidates_route(domain_name):
    match_candidates_bp = Blueprint("match_candidates", __name__)

    @match_candidates_bp.route("/api/match_candidates", methods=["POST"])
    def match_candidates():
        """ """
        try:
            if request.method == "POST":
                data = request.get_json()
                id = data.get("job_id")

                cand_match = []
                job_json = {"job_id": id}

                job = requests.post(
                    f"{domain_name}/api/get_job_by_id", json=job_json
                )
                job_skills = [
                    skill["skill_name"] for skill in job.json()["jobs"]["skills"]
                ]

                # if job.json()["jobs"]["values"]:
                job_values = job.json()["jobs"]["values"]
                # if job.json()["jobs"]["soft_skills"]:
                job_soft_skills = job.json()["jobs"]["soft_skills"]
                candidates_response = requests.get(
                    f"{domain_name}/api/get_all_candidates"
                )
                candidates = candidates_response.json()["candidates"]

                for candidate in candidates:
                    cand_skills = [skill["skill_name"] for skill in candidate["skills"]]
                    cand_levels = [skill["skill_level"] for skill in candidate["skills"]]
                    # if cand_skills and any(item in cand_skills for item in job_skills_ids):
                    cand_id = candidate["user_id"]
                    # print("LEVELS", cand_levels)
                    count = 4
                    total_score = 0

                    if cand_skills:
                        cand_tech_score = score(job_skills, cand_skills, cand_levels)
                        total_score += 4*cand_tech_score

                        if job_values:
                            count += 1
                            if candidate["values"]:
                                cand_val_score = score(job_values, candidate["values"])
                                total_score += cand_val_score
                        
                        if job_soft_skills:
                            count += 2
                            if candidate['soft_skills']:
                                cand_soft_score = score(job_soft_skills, candidate['soft_skills'])
                                total_score += 2*cand_soft_score

                        cand_score = round(total_score / count, 1)

                        if cand_score >= 20:
                            cand_match.append({"id": cand_id, "score": cand_score})
                            if candidate["matching_jobs"]:
                                duplicate = [ix for ix, job in enumerate(candidate["matching_jobs"]) if job["id"]==id]
                                if duplicate:
                                    candidate["matching_jobs"][duplicate[0]]['score'] = cand_score
                                else:
                                    candidate["matching_jobs"].append(
                                        {"id": id, "score": cand_score}
                                    )
                            else:
                                candidate["matching_jobs"] = []
                                candidate["matching_jobs"].append(
                                    {"id": id, "score": cand_score}
                                )
                            update_cand_json = {
                                "user_id": cand_id,
                                "matching_jobs": candidate["matching_jobs"],
                            }
                            update_cand_response = requests.put(
                                f"{domain_name}/api/update_candidate",
                                json=update_cand_json,
                            )
                        

                update_json = {"job_id": id, "matching_candidates": cand_match}
                update_job = requests.put(
                    f"{domain_name}/api/update_job", json=update_json
                )

                if update_job.status_code == 200:
                    return (
                        jsonify(
                            {
                                "message": "Update job successfully",
                                "matching_candidates": cand_match,
                            }
                        ),
                        200,
                    )

                else:
                    return jsonify({"message": f"Error matching candidates"}), 500

        except Exception as e:
            return jsonify({"message": f"Error matching candidates: {e}"}), 500

        return jsonify({"message": "Invalid request"}), 400

    return match_candidates_bp
