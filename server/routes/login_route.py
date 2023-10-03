from db_model.user import User
from flask import app, request, jsonify, Blueprint
from passlib.hash import bcrypt
from db_model.user import init_user_model
from db_model.company import init_company_model
from db_model.candidate import init_candidate_model
from flask_sqlalchemy import SQLAlchemy
from extensions import db
from flask_login import login_user



login_bp = Blueprint("login", __name__,)




@login_bp.route("/api/login", methods=["POST"])
def login():
    """
    Authenticate and log in a user.

    This route handles user authentication and login by accepting a POST request with
    JSON data containing the username and password. It verifies the provided
    credentials, and if they are correct, marks the user as authenticated using the
    `login_user` function.

    Parameters (POST JSON data):
        - username (str): The username of the user trying to log in.
        - password (str): The password provided by the user.

    Returns:
        - 200 OK: If the login is successful.
        - 400 Bad Request: If either the username or password is missing.
        - 401 Unauthorized: If the provided username is not registered or if the
          password is incorrect.

    Note:
        - The route uses the `bcrypt` library to securely verify the password.
        - After a successful login, the user is marked as authenticated with `login_user()`,
          and they can access protected resources.
    """
    if request.method == "POST":
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"message": "Username and password are required"}), 400
        # Retrieve the user from the database based on the provided username
        user = User.query.filter_by(username=username).first()

        if user:
            # Find the user
            user_type = user.user_type
            if user_type == "candidate":
                existing_user = Candidate.query.filter_by(username=username).first()
            elif user_type == "company":
                existing_user = Company.query.filter_by(username=username).first()

            # Verify the password using passlib
            if bcrypt.verify(password, existing_user.password):
                # If the password is valid, mark the user as authenticated
                login_user(user)
                return jsonify({"message": "Login successful"}), 200
            else:
                return jsonify({"message": "Invalid username or password"}), 401
        else:
            return jsonify({"message": "User is not registered"}), 401