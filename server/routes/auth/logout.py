from flask import Blueprint, jsonify
from flask_login import (login_required, logout_user)

logout_bp = Blueprint("logout", __name__)

@logout_bp.route("/api/logout", methods=["GET"])
@login_required
def logout():
    """
    Log out the currently authenticated user.

    Returns:
        str: JSON response indicating successful logout.
    """
    logout_user()
    return jsonify({"message": "Logged out successfully"})