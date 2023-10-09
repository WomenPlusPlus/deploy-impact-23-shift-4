from flask import Blueprint, jsonify, request


def get_company_by_id_route(Company):
    get_company_by_id_bp = Blueprint("get_company_by_id", __name__)

    @get_company_by_id_bp.route("/api/get_company_by_id", methods=["GET"])
    def get_company_by_id():
        try:
            if request.method == "GET":
                data = request.get_json()
                id = data.get("user_id")

                if not id:
                    return jsonify({"message": "Missing 'id' in JSON data"}), 400

                company = Company.query.filter_by(user_id=id).first()
                if not company:
                    return jsonify({"message": "company not found"}), 404

                company_data = {
                    "id": company.id,
                    "user_id": company.user_id,
                    "email": company.email,
                    "associations": company.associations,
                    "address": company.address,
                    "values": company.values,
                    "job_offerings": company.job_offerings,
                    "contact_details": company.contact_details,
                    "company_name": company.company_name,
                    "linkedin_url": company.linkedin_url,
                    "kununu_url": company.kununu_url,
                    "positions_job_list": company.positions_job_list,
                }

                return jsonify({"companys": company_data}), 200

        except Exception as e:
            jsonify({"message": f"Error getting company data: {e}"}), 500

        return jsonify({"company": []})

    return get_company_by_id_bp
