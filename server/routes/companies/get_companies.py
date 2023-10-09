from flask import Blueprint, jsonify, request


def get_all_companies_route(Company):
    get_all_companies_bp = Blueprint("get_companies", __name__)

    @get_all_companies_bp.route("/api/get_all_companies", methods=["GET"])
    def get_all_companies():
        """
        Get all companies from the database.

        Returns:
            A JSON object containing all companies in the database.
        """
        try:
            if request.method == "GET":
                companies = Company.query.all()
                result = []

            for company in companies:
                company_data = {
                    "id": company.id,
                    "user.id": company.user_id,
                    "email": company.email,
                    "associations": company.associations,
                    "address": company.address,
                    "values": company.values,
                    "job.offerings": company.job_offerings,
                    "contact.details": company.contact_details,
                    "company.name": company.company_name,
                    "linkedin.url": company.linkedin_url,
                    "kununu.url": company.kununu_url,
                    "positions.job.list": company.positions_job_list,
                }
                result.append(company_data)

            return jsonify({"companies": result}), 200
        except Exception as e:
            jsonify({"message": f"Error getting companies: {e}"}), 500

        return jsonify({"companies": []})

    return get_all_companies_bp
