from flask import Blueprint, jsonify, request
from flask_login import current_user
from routes.auth.load_user import load_user


def check_authentication_route(User):
    check_auth_bp = Blueprint("check_auth_route", __name__)

    @check_auth_bp.route("/api/check_authentication", methods=["POST"])
    def check_authentication():
        """
        Check if the user is authenticated.

        Returns:
            str: JSON response indicating whether the user is authenticated.
        """
        if request.method == "POST":
            data = request.get_json()
            user_id = data.get("id")
            is_user = load_user(User, user_id)
            if is_user:
                return jsonify({"authenticated": True})
            else:
                return jsonify({"authenticated": False})
        
        return jsonify({"authenticated": False})

    return check_auth_bp
