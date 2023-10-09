from flask import Blueprint, jsonify, request


def get_all_candidates_route(Candidate):
    get_all_candidates_bp = Blueprint("get_candidates", __name__)

    @get_all_candidates_bp.route("/api/get_all_candidates", methods=["GET"])
    def get_all_candidates():
        """ """
        try:
            if request.method == "GET":
                candidates = Candidate.query.all()
                result = []

            for candidate in candidates:
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
                result.append(candidate_data)

            return jsonify({"candidates": result}), 200
        except Exception as e:
            jsonify({"message": f"Error getting candidates: {e}"}), 500

        return jsonify({"candidates": []})

    return get_all_candidates_bp
