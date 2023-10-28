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
        candidate_score = np.multiply(
            similarity_matrix_resolved, candidate_levels
        ).sum()
        percent_score = (candidate_score / total_score) * 100
    else:
        percent_score = similarity_matrix_resolved.sum() / len(job_skills)
    return round(percent_score, 1)


def match_jobs_route(domain_name):
    match_jobs_bp = Blueprint("match_jobs", __name__)

    @match_jobs_bp.route("/api/match_jobs", methods=["POST"])
    def match_jobs():
        print("DOMAIN", domain_name)
        try:
            if request.method == "POST":
                data = request.get_json()
                id = data.get("user_id")

                job_match = []
                cand_skills = []
                cand_levels = []
                cand_values = []
                cand_soft_skills = []

                cand_json = {"user_id": id}

                candidate = requests.post(
                    f"{domain_name}/api/get_candidate_by_id", json=cand_json
                )
                if candidate.status_code == 200:
                    if len(candidate.json()["candidates"]["skills"]) > 0:
                        candidate_skills = [
                            skill["skill_name"]
                            for skill in candidate.json()["candidates"]["skills"]
                        ]
                        candidate_skills.append(cand_skills)
                        candidate_levels = [
                            skill["skill_level"]
                            for skill in candidate.json()["candidates"]["skills"]
                        ]
                        candidate_levels.append(cand_levels)

                    if len(candidate.json()["candidates"]["values"]) > 0:
                        candidate_values = candidate.json()["candidates"]["values"]
                        cand_values.append(candidate_values)

                    if len(candidate.json()["candidates"]["soft_skills"]) > 0:
                        candidate_soft_skills = candidate.json()["candidates"][
                            "soft_skills"
                        ]
                        cand_soft_skills.append(candidate_soft_skills)

                jobs_response = requests.get(f"{domain_name}/api/get_all_jobs")
                if jobs_response.status_code == 200:
                    jobs = jobs_response.json()["jobs"]

                    for job in jobs:
                        if len(job["skills"]) > 0:
                            job_skills = [
                                skill["skill_name"] for skill in job["skills"]
                            ]

                            job_id = job["id"]

                            count = 4
                            total_score = 0

                            if job_skills and len(cand_skills) > 0:
                                job_tech_score = score(
                                    job_skills, cand_skills, cand_levels
                                )
                                total_score += 4 * job_tech_score

                                if job["values"] and len(cand_values) > 0:
                                    count += 1
                                    if cand_values:
                                        job_val_score = score(
                                            job["values"], cand_values
                                        )
                                        total_score += job_val_score

                                if job["soft_skills"] and len(cand_soft_skills) > 0:
                                    count += 2
                                    if cand_soft_skills:
                                        job_soft_score = score(
                                            job["soft_skills"], cand_soft_skills
                                        )
                                        total_score += 2 * job_soft_score

                                job_score = round(total_score / count, 1)
                                
                                print("JOB SCORE", job_score)
                                if job_score >= 20:
                                    job_match.append({"id": job_id, "score": job_score})
                                    if job["matching_candidates"]:
                                        duplicate = [
                                            ix
                                            for ix, cand in enumerate(
                                                job["matching_candidates"]
                                            )
                                            if cand["id"] == id
                                        ]
                                        if duplicate:
                                            job["matching_candidates"][duplicate[0]][
                                                "score"
                                            ] = job_score
                                        else:
                                            job["matching_candidates"].append(
                                                {"id": id, "score": job_score}
                                            )
                                    else:
                                        job["matching_candidates"] = []
                                        job["matching_candidates"].append(
                                            {"id": id, "score": job_score}
                                        )
                                    update_job_json = {
                                        "job_id": job_id,
                                        "matching_candidates": job[
                                            "matching_candidates"
                                        ],
                                    }
                                    update_job_response = requests.put(
                                        f"{domain_name}/api/update_job",
                                        json=update_job_json,
                                    )
                    print("JOB MATCH", job_match)
                    update_json = {"user_id": id, "matching_jobs": job_match}
                    update_cand = requests.put(
                        f"{domain_name}/api/update_candidate", json=update_json
                    )
                    
                    if update_cand.status_code == 200:
                        return (
                            jsonify(
                                {
                                    "message": "Update Candidate successfully",
                                    "matching_jobs": job_match,
                                }
                            ),
                            200,
                        )

                    else:
                        return jsonify({"message": f"Error matching jobs"}), 417

        except Exception as e:
            return jsonify({"message": f"Error matching jobs: {e}"}), 500

        return jsonify({"message": "Invalid request"}), 400

    return match_jobs_bp
