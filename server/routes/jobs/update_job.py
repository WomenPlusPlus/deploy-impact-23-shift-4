from flask import Blueprint, jsonify, request


def update_job_route(Job, db):
    update_job_bp = Blueprint("update_job", __name__)

    @update_job_bp.route("/api/update_job", methods=["PUT"])
    def update_job():
        try:
            if request.method == "PUT":
                data = request.get_json()
                id = data.get("job_id")

                job = Job.query.filter_by(id=id).first()

                if not job:
                    return jsonify({"message": "job not found"}), 404

                if "company_id" in data:
                    job.company_id = data["company_id"]
                if "title" in data:
                    job.title = data["title"]
                if "description" in data:
                    job.description = data["description"]
                if "values" in data:
                    job.values = data["values"]
                if "skills" in data:
                    job.skills = data["skills"]
                if "hiring_process_duration" in data:
                    job.hiring_process_duration = data["hiring_process_duration"]
                if "posting_date" in data:
                    job.posting_date = data["posting_date"]
                if "matching_candidates" in data:
                    job.matching_candidates = data["matching_candidates"]
                if "salary" in data:
                    job.salary = data["salary"]
                if "location" in data:
                    job.location = data["location"]

                db.session.commit()

                return jsonify({"message": "job updated successfully"}), 200

        except Exception as e:
            return jsonify({"message": f"Error updating job: {e}"}), 500

        return jsonify({"message": "Invalid request"}), 400

    return update_job_bp
