from flask import Blueprint, jsonify, request


def update_candidate_route(Candidate, db):
    update_candidate_bp = Blueprint("update_candidate", __name__)

    @update_candidate_bp.route("/api/update_candidate", methods=["PUT"])
    def update_candidate():
        """
        Update the candidate matching the given user_id. The request body must
        contain a JSON object with the fields to be updated.

        Returns:
            str: JSON response indicating successful candidate update.
        """
        try:
            if request.method == "PUT":
                data = request.get_json()
                id = data.get("user_id")

                candidate = Candidate.query.filter_by(user_id=id).first()

                if not candidate:
                    return jsonify({"message": "Candidate not found"}), 404

                # Update the candidate's fields based on the data provided
                if "email" in data:
                    candidate.email = data["email"]
                if "first_name" in data:
                    candidate.first_name = data["first_name"]
                if "last_name" in data:
                    candidate.last_name = data["last_name"]
                if "preferred_name" in data:
                    candidate.preferred_name = data["preferred_name"]
                if "cv_reference" in data:
                    candidate.cv_reference = data["cv_reference"]
                if "values" in data:
                    candidate.values = data["values"]
                if "searched_job" in data:
                    candidate.searched_job = data["searched_job"]
                if "address" in data:
                    candidate.address = data["address"]
                if "phone_number" in data:
                    candidate.phone_number = data["phone_number"]
                if "birth_date" in data:
                    candidate.birth_date = data["birth_date"]
                if "work_permit" in data:
                    candidate.work_permit = data["work_permit"]
                if "notice_period" in data:
                    candidate.notice_period = data["notice_period"]
                if "job_status" in data:
                    candidate.job_status = data["job_status"]
                if "company_type" in data:
                    candidate.company_type = data["company_type"]
                if "matching_jobs" in data:
                    candidate.matching_jobs = data["matching_jobs"]
                if "matching_companies" in data:
                    candidate.matching_companies = data["matching_companies"]
                if "skills" in data:
                    candidate.skills = data["skills"]
                if "languages" in data:
                    candidate.languages = data["languages"]

                db.session.commit()

                return jsonify({"message": "Candidate updated successfully"}), 200

        except Exception as e:
            return jsonify({"message": f"Error updating candidate: {e}"}), 500

        return jsonify({"message": "Invalid request"}), 400

    return update_candidate_bp
