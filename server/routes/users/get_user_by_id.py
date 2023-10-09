from flask_login import Blueprint, jsonify, request


def get_user_by_id_route(User):
    get_user_by_id_bp = Blueprint("get_user_by_id", __name__)

    @get_user_by_id_bp.route("/api/get_user_by_id", methods=["GET"])
    def get_user_by_id():
        """
        Get a user by id.

        Returns:
            A JSON object containing the user data.
        """
        try:
            if request.method == "GET":
                data = request.get_json()
                id = data.get("user_id")

                if not id:
                    return jsonify({"message": "Missing 'id' in JSON data"}), 400

                user = User.query.filter_by(id=id).first()
                if not user:
                    return jsonify({"message": "user not found"}), 404

                user_data = {
                    "id": user.id,
                    "email": user.email,
                    "password": user.password,
                    "user_type": user.user_type,
                }

                return jsonify({"users": user_data}), 200

        except Exception as e:
            jsonify({"message": f"Error getting user data: {e}"}), 500

        return jsonify({"user": []})

    return get_user_by_id_bp
