from flask import Blueprint, jsonify, request


def get_candidate_by_id_route(Candidate):
    get_candidate_by_id_bp = Blueprint("get_candidate_by_id", __name__)

    @get_candidate_by_id_bp.route("/api/get_candidate_by_id", methods=["POST"])
    def get_candidate_by_id():
        try:
            if request.method == "POST":
                data = request.get_json()
                id = data.get("user_id")
                print("ID",id)
                if not id:
                    return jsonify({"message": "Missing 'id' in JSON data"}), 400

                candidate = Candidate.query.filter_by(user_id=id).first()
                if not candidate:
                    return jsonify({"message": "Candidate not found"}), 404

                candidate_data = {
                    "id": candidate.id,
                    "user_id": candidate.user_id,
                    "email": candidate.email,
                    "associations": candidate.associations,
                    "first_name": candidate.first_name,
                    "last_name": candidate.last_name,
                    "preferred_name": candidate.preferred_name,
                    "cv_reference": candidate.cv_reference,
                    "searched_job": candidate.searched_job,
                    "address": candidate.address,
                    "phone_number": candidate.phone_number,
                    "birth_date": candidate.birth_date,
                    "work_permit": candidate.work_permit,
                    "notice_period": candidate.notice_period,
                    "job_status": candidate.job_status,
                    "company_type": candidate.company_type,
                    "matching_jobs": candidate.matching_jobs,
                    "matching_companies": candidate.matching_companies,
                    "values": candidate.values,
                    "skills": candidate.skills,
                    "languages": candidate.languages,
                }

                return jsonify({"candidates": candidate_data}), 200

        except Exception as e:
            jsonify({"message": f"Error getting candidate data: {e}"}), 500

        return jsonify({"candidate": []})

    return get_candidate_by_id_bp
