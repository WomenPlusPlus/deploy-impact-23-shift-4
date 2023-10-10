from flask import Blueprint, jsonify
from flask_login import current_user

check_auth_bp = Blueprint("check_auth", __name__)


@check_auth_bp.route("/api/check_authentication", methods=["GET"])
def check_authentication():
    """
    Check if the user is authenticated.

    Returns:
        str: JSON response indicating whether the user is authenticated.
    """
    if current_user.is_authenticated:
        return jsonify({"authenticated": True})
    else:
        return jsonify({"authenticated": False})
