from flask import Blueprint, jsonify, request


def update_company_route(Company, db):
    update_company_bp = Blueprint("update_company", __name__)

    @update_company_bp.route("/api/update_company", methods=["PUT"])
    def update_company():
        try:
            if request.method == "PUT":
                data = request.get_json()
                id = data.get("user_id")

                company = Company.query.filter_by(user_id=id).first()

                if not company:
                    return jsonify({"message": "company not found"}), 404

                # Update the company's fields based on the data provided
                if "email" in data:
                    company.email = data["email"]
                if "associations" in data:
                    company.associations = data["associations"]
                if "company_name" in data:
                    company.company_name = data["company_name"]
                if "address" in data:
                    company.address = data["address"]
                if "values" in data:
                    company.values = data["values"]
                if "job_offerings" in data:
                    company.job_offerings = data["job_offerings"]
                if "contact_details" in data:
                    company.contact_details = data["contact_details"]
                if "linkedin_url" in data:
                    company.linkedin_url = data["linkedin_url"]
                if "kununu_url" in data:
                    company.kununu_url = data["kununu_url"]
                if "positions_job_list" in data:
                    company.positions_job_list = data["positions_job_list"]

                db.session.commit()

                return jsonify({"message": "company updated successfully"}), 200

        except Exception as e:
            return jsonify({"message": f"Error updating company: {e}"}), 500

        return jsonify({"message": "Invalid request"}), 400

    return update_company_bp
