import time
from flask import Blueprint, jsonify, request
from services.temporary_url import verify_temporary_link_signed, is_token_expired
import os

verify_invite_bp = Blueprint("verify_invite", __name__)
secret_key = os.environ.get("SECRET_KEY")

@verify_invite_bp.route("/api/verify_invite", methods=["POST"])
def verify_invite():
    
    if request.method == "POST":
        data = request.get_json()
        temporary_link = data.get("link")
        user_type = data.get("user_type")

        print(is_token_expired(temporary_link))
        if verify_temporary_link_signed(temporary_link, secret_key, user_type) and is_token_expired(temporary_link):
            return jsonify({"success": 200, "message": "Temporary link is valid."})
        else:
            return jsonify({"error": 400, "message": "Temporary link is not valid."})
