from flask import Blueprint, jsonify, request


def get_all_values_route(values):
    get_all_values_bp = Blueprint("get_values", __name__)

    @get_all_values_bp.route("/api/get_all_values", methods=["GET"])
    def get_all_values():
        """
        Get all values from the database.

        Returns:
            A JSON object containing all values in the database.
        """
        try:
            if request.method == "GET":
                values = values.query.all()
                result = []

            for value in values:
                value_data = {
                    "id": value.id,
                    "name": value.name,
                }
                result.append(value_data)

            return jsonify({"values": result}), 200
        except Exception as e:
            jsonify({"message": f"Error getting values: {e}"}), 500

        return jsonify({"values": []})

    return get_all_values_bp
