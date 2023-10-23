# from .train_model import vectorizer
import dill
import requests
import string
import numpy as np
from flask import Blueprint, jsonify, request
from sklearn.metrics.pairwise import cosine_similarity

with open("model/vectorizer.pkl", "rb") as file:
    vectorizer = dill.load(file)


def score(job_skills, candidate_skills_dict):
    skills_dict = {"beginner": 1, "intermediate": 2, "advanced": 3, "pro": 4}
    job_skills = ["_".join(skill.lower().split(" ")) for skill in job_skills]
    job_skills_vector = vectorizer.transform(job_skills)
    candidate_skills, candidate_levels = zip(*candidate_skills_dict.items())
    candidate_levels = [[skills_dict[level]] for level in candidate_levels]
    candidate_skills = [
        "_".join(skill.lower().split(" ")) for skill in candidate_skills
    ]
    candidate_skills_vector = vectorizer.transform(candidate_skills)
    total_score = 4 * len(job_skills)
    similarity_matrix = cosine_similarity(candidate_skills_vector, job_skills_vector)
    similarity_matrix_resolved = (similarity_matrix > 0.7).astype("int32")
    candidate_score = np.multiply(similarity_matrix_resolved, candidate_levels).sum()
    percent_score = candidate_score / total_score * 100
    return round(percent_score, 1)


def match_jobs_route():
    match_jobs_bp = Blueprint("match_jobs", __name__)

    @match_jobs_bp.route("/api/match_jobs", methods=["POST"])
    def match_jobs():
        """ """
        try:
            if request.method == "POST":
                data = request.get_json()
                id = data.get("user_id")

                job_match = []
                cand_json = {"user_id": id}

                candidate = requests.post(
                    "http://localhost:5001/api/get_candidate_by_id", json=cand_json
                )
                cand_skills = {
                    skill["skill_name"]: skill["skill_level"]
                    for skill in candidate.json()["candidates"]["skills"]
                }
                # candidate.json()['candidates']['skills']['technicalSkills']
                jobs_response = requests.get("http://localhost:5001/api/get_all_jobs")
                jobs = jobs_response.json()["jobs"]

                for job in jobs:
                    job_skills = [skill["skill_name"] for skill in job["skills"]]
                    # if cand_skills and any(item in cand_skills for item in job_skills_ids):
                    job_id = job["id"]
                    if job_skills:
                        job_score = score(job_skills, cand_skills)
                        if job_score > 10:
                            job_match.append({"id": job_id, "score": job_score})
                            if job["matching_candidates"]:
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
                                "matching_candidates": job["matching_candidates"],
                            }
                            update_job_response = requests.put(
                                "http://localhost:5001/api/update_job",
                                json=update_job_json,
                            )

                update_json = {"user_id": id, "matching_jobs": job_match}
                update_cand = requests.put(
                    "http://localhost:5001/api/update_candidate", json=update_json
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
                    return jsonify({"message": f"Error matching jobs"}), 500

        except Exception as e:
            return jsonify({"message": f"Error matching jobs: {e}"}), 500

        return jsonify({"message": "Invalid request"}), 400

    return match_jobs_bp
