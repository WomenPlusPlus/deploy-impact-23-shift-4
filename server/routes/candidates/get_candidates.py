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
                    "username": candidate.username,
                    "email": candidate.email,
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
                result.append(candidate_data)

            return jsonify({"candidates": result}), 200
        except Exception as e:
            jsonify({"message": f"Error getting candidates: {e}"}), 500

        return jsonify({"candidates": []})

    return get_all_candidates_bp
