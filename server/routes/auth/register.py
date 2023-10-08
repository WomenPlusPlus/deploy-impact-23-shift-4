import bcrypt
from flask import Blueprint, jsonify, request
from flask_login import login_user


def register_route(User, Candidate, Company, db):
    register_bp = Blueprint("register", __name__)

    @register_bp.route("/api/register", methods=["POST"])
    def register():
        """
        Register a new user.

        This route handles user registration by accepting a POST request with JSON data.
        It validates the data, checks if the username already exists, and saves the
        user information in the appropriate table based on the provided user_type.

        Parameters (POST JSON data):
            - username (str): The username for the new user.
            - password (str): The password for the new user (will be hashed).
            - email (str): The email address of the new user.
            - user_type (str): The type of user (e.g., "candidate" or "company").

        Returns:
            - 200 OK: If the registration is successful.
            - 400 Bad Request: If the provided username already exists or if the
            user_type is invalid.
        """
        if request.method == "POST":
            data = request.get_json()
            username = data.get("username")
            password = data.get("password")
            email = data.get("email")
            user_type = data.get("user_type")  # Get user type from the request
            associations = data.get("associations")
            print(associations)

            # Hash the password before saving it to the appropriate table
            hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
            hashed_password = hashed_password.decode("utf-8")

            # Check if the username already exists in the appropriate table
            existing_user = User.query.filter_by(username=username).first()
            if existing_user:
                return jsonify({"message": "Username already exists"}), 400

            # Save the new user in the "user" table
            new_user = User(
                username=username,
                password=hashed_password,
                email=email,
                user_type=user_type,
                associations=associations,
            )
            db.session.add(new_user)
            db.session.commit()

            # Create a new user and save it to the appropriate table
            if user_type == "candidate":
                # Save the user also in the "candidate" table
                new_user = Candidate(
                    username=username,
                    password=hashed_password,
                    email=email,
                    associations=associations,
                )
                db.session.add(new_user)
                db.session.commit()
            elif user_type == "company":
                # Save the user also in the "company" table
                new_user = Company(
                    username=username,
                    password=hashed_password,
                    email=email,
                    associations=associations,
                )
                db.session.add(new_user)
                db.session.commit()
            else:
                return jsonify({"message": "Invalid user type"}), 400

            login_user(new_user)
            return jsonify(
                {"message": "User registered successfully", "user_type": user_type}
            )

    return register_bp
