from flask import Blueprint, jsonify, request


def get_all_jobs_route(Jobs):
    get_all_jobs_bp = Blueprint("get_jobs", __name__)

    @get_all_jobs_bp.route("/api/get_all_jobs", methods=["GET"])
    def get_all_jobs():
        """
        Get all jobs from the database.

        Returns:
            A JSON object containing all jobs in the database.
        """
        try:
            if request.method == "GET":
                jobs = Jobs.query.all()
                result = []

                for job in jobs:
                    job_data = {
                        "id": job.id,
                        "associations": job.associations,
                        "company_id": job.company_id,
                        "title": job.title,
                        "description": job.description,
                        "values": job.values,
                        "skills": job.skills,
                        "hiring_process_duration": job.hiring_process_duration,
                        "posting_date": job.posting_date,
                        "matching_candidates": job.matching_candidates,
                        "salary": job.salary,
                        "location": job.location,
                    }
                    result.append(job_data)

            return jsonify({"jobs": result}), 200
        except Exception as e:
            jsonify({"message": f"Error getting jobs: {e}"}), 500

        return jsonify({"jobs": []})

    return get_all_jobs_bp
