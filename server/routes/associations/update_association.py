from flask import Blueprint, jsonify, request


def update_association_route(Association, db):
    update_association_bp = Blueprint("update_association", __name__)

    @update_association_bp.route("/api/update_association/", methods=["PUT"])
    def update_association():
        try:
            if request.method == "PUT":
                data = request.get_json()
                id = data.get("user_id")

                association = Association.query.filter_by(user_id=id).first()

                if not association:
                    return jsonify({"message": "association not found"}), 404

                # Update the association's fields based on the data provided
                if "email" in data:
                    association.email = data["email"]
                if "association_name" in data:
                    association.association_name = data["association_name"]
                if "address" in data:
                    association.address = data["address"]
                if "contact_details" in data:
                    association.contact_details = data["contact_details"]
                if "url" in data:
                    association.url = data["url"]

                db.session.commit()

                return jsonify({"message": "association updated successfully"}), 200

        except Exception as e:
            return jsonify({"message": f"Error updating association: {e}"}), 500

        return jsonify({"message": "Invalid request"}), 400

    return update_association_bp
