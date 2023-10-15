from flask import Blueprint, jsonify, request


def add_job_route(Jobs, db):
    add_job_bp = Blueprint("add_job", __name__)

    @add_job_bp.route("/api/add_job", methods=["POST"])
    def add_job():
        """ """
        if request.method == "POST":
            data = request.get_json()
            associations = data.get("associations")
            company_id = data.get("company_id")
            title = data.get("title")
            description = data.get("description")
            values = data.get("values")
            skills = data.get("skills")
            hiring_process_duration = data.get("hiring_process_duration")
            posting_date = data.get("posting_date")
            matching_candidates = data.get("matching_candidates")
            salary = data.get("salary")
            location = data.get("location")

            new_job = Jobs(
                company_id=company_id,
                associations=associations,
                title=title,
                description=description,
                values=values,
                skills=skills,
                hiring_process_duration=hiring_process_duration,
                posting_date=posting_date,
                matching_candidates=matching_candidates,
                salary=salary,
                location=location,
            )

            db.session.add(new_job)
            db.session.commit()

            return jsonify({"message": "Job added successfully"})

    return add_job_bp
