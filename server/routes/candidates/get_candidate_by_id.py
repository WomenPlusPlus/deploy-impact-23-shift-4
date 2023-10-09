from flask_login import Blueprint, jsonify, request


def get_candidate_by_id_route(Candidate):
    get_candidate_by_id_bp = Blueprint("get_candidate_by_id", __name__)

    @get_candidate_by_id_bp.route("/api/get_candidate_by_id", methods=["GET"])
    def get_candidate_by_id():
        try:
            if request.method == "GET":
                data = request.get_json()
                id = data.get("user_id")

                candidate = Candidate.query.filter_by(user_id=id).first()
                if not candidate:
                    return jsonify({"message": "Candidate not found"}), 404

                candidate_data = {
                    "id": candidate.id,
                    "user.id": candidate.user_id,
                    "email": candidate.email,
                    "associations": candidate.associations,
                    "first.name": candidate.first_name,
                    "last.name": candidate.last_name,
                    "preferred.name": candidate.preferred_name,
                    "cv.reference": candidate.cv_reference,
                    "type.of.job.searching": candidate.searched_job,
                    "address": candidate.address,
                    "phone.number": candidate.phone_number,
                    "birth.date": candidate.birth_date,
                    "work.permit": candidate.work_permit,
                    "notice.period": candidate.notice_period,
                    "job.status": candidate.job_status,
                    "type.of.company": candidate.company_type,
                    "matching.jobs": candidate.matching_jobs,
                    "matching.companies": candidate.matching_companies,
                    "values": candidate.values,
                    "skills": candidate.skills,
                    "languages": candidate.languages,
                }

                return jsonify({"candidates": candidate_data}), 200

        except Exception as e:
            jsonify({"message": f"Error getting candidate data: {e}"}), 500

        return jsonify({"candidate": []})

    return get_candidate_by_id_bp
