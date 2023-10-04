from flask import jsonify, Blueprint
from flask_login import current_user

api_check_authentication_bp = Blueprint("api_check_authentication", __name__)


@api_check_authentication_bp.route("/api/check_authentication", methods=["GET"])
def check_authentication():
    """
    Check if the user is authenticated.

    Returns:
        str: JSON response indicating whether the user is authenticated.
    """
    if current_user.is_authenticated:
        return jsonify({"authenticated": True, "username": current_user.username})
    else:
        return jsonify({"authenticated": False})