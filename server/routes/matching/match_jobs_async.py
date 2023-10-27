import dill
import string
import numpy as np
from flask import Blueprint, jsonify, request
from sklearn.metrics.pairwise import cosine_similarity
import aiohttp
import asyncio

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
        candidate_score = np.multiply(
            similarity_matrix_resolved, candidate_levels
        ).sum()
        percent_score = (candidate_score / total_score) * 100
    else:
        percent_score = similarity_matrix_resolved.sum() / len(job_skills)
    return round(percent_score, 1)


async def fetch_candidate_data(session, domain_name, id):
    async with session.post(
        f"{domain_name}/api/get_candidate_by_id", json={"user_id": id}
    ) as response:
        return await response


async def fetch_update_candidate_data(session, domain_name, update_json):
    async with session.put(
        f"{domain_name}/api/update_candidate", json=update_json
    ) as response:
        return await response


async def fetch_jobs_data(session, domain_name):
    async with session.get(f"{domain_name}/api/get_all_jobs") as response:
        return await response


async def update_job(session, domain_name, job_id, matching_candidates):
    update_job_json = {
        "job_id": job_id,
        "matching_candidates": matching_candidates,
    }
    async with session.put(
        f"{domain_name}/api/update_job", json=update_job_json
    ) as response:
        return await response


async def match_jobs_logic(domain_name, data):
    id = data.get("user_id")
    job_match = []

    async with aiohttp.ClientSession() as session:
        candidate_response = await fetch_candidate_data(session, domain_name, id)
        jobs_response = await fetch_jobs_data(session, domain_name)

        if (
            jobs_response
            and candidate_response
            and jobs_response.status == 200
            and candidate_response.status == 200
        ):
            jobs = jobs_response.json()["jobs"]
            candidate = candidate_response.json()
            existing_matching_jobs = candidate.get("candidates", {}).get(
                "matching_jobs", []
            )

            for job in jobs:
                job_skills = [skill["skill_name"] for skill in job.get("skills", [])]
                job_id = job["id"]

                if any(
                    matching_job["id"] == job_id
                    for matching_job in existing_matching_jobs
                ):
                    continue

                count = 4
                total_score = 0

                if job_skills:
                    job_tech_score = score(
                        job_skills,
                        candidate.get("candidates", {}).get("skills", []),
                        candidate.get("candidates", {}).get("skills_levels", []),
                    )
                    total_score += 4 * job_tech_score

                    if job.get("values"):
                        count += 1
                        job_val_score = score(
                            job.get("values"),
                            candidate.get("candidates", {}).get("values", []),
                        )
                        total_score += job_val_score

                    if job.get("soft_skills"):
                        count += 2
                        job_soft_score = score(
                            job.get("soft_skills"),
                            candidate.get("candidates", {}).get("soft_skills", []),
                        )
                        total_score += 2 * job_soft_score

                    job_score = round(total_score / count, 1)

                    # TODO: increase threshold to 60
                    if job_score >= 20:
                        job_match.append({"id": job_id, "score": job_score})

                        if job.get("matching_candidates"):
                            duplicate = next(
                                (
                                    ix
                                    for ix, cand in enumerate(
                                        job.get("matching_candidates", [])
                                    )
                                    if cand.get("id") == id
                                ),
                                None,
                            )
                            if duplicate is not None:
                                job["matching_candidates"][duplicate][
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

                        update_job_response = await update_job(
                            session,
                            domain_name,
                            job_id,
                            job.get("matching_candidates", []),
                        )
                        print("UPDATE JOB", update_job_response.status)

            if not job_match:
                return jsonify({"message": "No matching jobs"}), 200

            update_json = {"user_id": id, "matching_jobs": job_match}
            update_cand = await fetch_update_candidate_data(
                session, domain_name, update_json
            )
            if update_cand and update_cand.status == 200:
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
        else:
            print("ERROR", jobs_response, candidate)

    return jsonify({"message": "Invalid request"}), 400


def match_jobs_route(domain_name):
    match_jobs_bp = Blueprint("match_jobs", __name__)

    @match_jobs_bp.route("/api/match_jobs", methods=["POST"])
    def match_jobs():
        print("DOMAIN", domain_name)
        try:
            if request.method == "POST":
                data = request.get_json()
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                return loop.run_until_complete(match_jobs_logic(domain_name, data))

        except Exception as e:
            return jsonify({"message": f"Error matching jobs: {e}"}), 500

        return jsonify({"message": "Invalid request"}), 400

    return match_jobs_bp
