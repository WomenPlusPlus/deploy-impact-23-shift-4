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
                    "user_id": company.user_id,
                    "email": company.email,
                    "associations": company.associations,
                    "logo": company.logo,
                    "address": company.address,
                    "values": company.values,
                    "job_types": company.job_types,
                    "contact_details": company.contact_details,
                    "company_name": company.company_name,
                    "linkedin_url": company.linkedin_url,
                    "kununu_url": company.kununu_url,
                    "open_positions": company.open_positions,
                }
                result.append(company_data)

            return jsonify({"companies": result}), 200
        except Exception as e:
            jsonify({"message": f"Error getting companies: {e}"}), 500

        return jsonify({"companies": []})

    return get_all_companies_bp
