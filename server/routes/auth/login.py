import bcrypt
from datetime import timedelta
from flask import Blueprint, jsonify, request
from flask_login import (current_user, login_user)

def login_route(User):
    login_bp = Blueprint("login", __name__)

    @login_bp.route("/api/login", methods=["GET","POST"])
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
                # Verify the password using passlib
                if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
                    # If the password is valid, mark the user as authenticated
                    is_logged = login_user(user, force=True,remember=True, duration=timedelta(days=1))
                    if is_logged:
                        return jsonify({"message": "Login successful", "user_type": user_type}), 200
                    else:
                        return jsonify({"message": "Login unsuccessful", "user_type": user_type}), 417
                else:
                    return jsonify({"message": "Invalid username or password"}), 401
            else:
                return jsonify({"message": "User is not registered"}), 401
        
        if request.method == "GET":
            if current_user.is_authenticated:
                return jsonify({"message": "Logged in"}), 200
            else:
                return jsonify({"message": "Not logged in"}), 200

        return jsonify({"message": "Method Not Allowed"}), 405
    
    return login_bp