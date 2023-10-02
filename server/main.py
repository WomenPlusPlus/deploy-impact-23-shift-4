from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import (
    LoginManager,
    login_user,
    login_required,
    logout_user,
    current_user,
)
from passlib.hash import bcrypt
from db_model.user import init_user_model
from db_model.company import init_company_model
from db_model.candidate import init_candidate_model
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()
import os

# Constants
database_uri = os.environ.get("DATABASE_URI_TEST")
secret_key = os.environ.get("SECRET_KEY")

# App config
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_uri
app.config[
    "SQLALCHEMY_TRACK_MODIFICATIONS"
] = True  # Keep the server reloading on changes
app.config["SECRET_KEY"] = secret_key
# Initialize CORS with your Flask app
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000", "supports_credentials": True}})
# Database
db = SQLAlchemy(app)

# Login manager
login_manager = LoginManager(app)
login_manager.login_view = "login"
login_manager.init_app(app)

# Models
User = init_user_model(db)
Candidate = init_candidate_model(db)
Company = init_company_model(db)


@login_manager.user_loader
def load_user(user_id):
    """
    Load a user by their user ID.

    Args:
        user_id (int): The user's ID.

    Returns:
        User: The User object associated with the provided user ID.
    """
    return User.query.get(int(user_id))


@app.route("/api/register", methods=["POST"])
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

        # Hash the password before saving it to the appropriate table
        hashed_password = bcrypt.hash(password)

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
        )
        db.session.add(new_user)
        db.session.commit()

        # Create a new user and save it to the appropriate table
        if user_type == "candidate":
            # Save the user also in the "candidate" table
            new_user = Candidate(
                username=username, password=hashed_password, email=email
            )
            db.session.add(new_user)
            db.session.commit()
        elif user_type == "company":
            # Save the user also in the "company" table
            new_user = Company(username=username, password=hashed_password, email=email)
            db.session.add(new_user)
            db.session.commit()
        else:
            return jsonify({"message": "Invalid user type"}), 400

        return jsonify({"message": "User registered successfully"})


@app.route("/api/find_user", methods=["POST"])
def find_user_type():
    """
    Find the user type of a given username.

    This route handles a POST request to find the user type associated with a
    given username by querying the database.

    Parameters (POST JSON data):
        - username (str): The username for which to find the user type.

    Returns:
        - JSON: A JSON response containing the user type associated with the
          provided username.

    Note:
        - If the username is not found in the database, it returns an empty
          JSON response.
    """
    try:
        if request.method == "POST":
            data = request.get_json()
            username = data.get("username")
            existing_user = User.query.filter_by(username=username).first()

            return jsonify({"user": existing_user.user_type})
    except Exception:
        pass


@app.route("/api/login", methods=["GET","POST"])
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
            if bcrypt.verify(password, user.password):
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


@app.route("/api/delete_user", methods=["POST"])
# @login_required
def delete_user():
    """
    Delete the currently authenticated user.

    Returns:
        str: JSON response indicating successful user deletion.
    """
    if request.method == "POST":
        # print(current_user)
        # current_db_user = User.query.get(current_user.id)
        # print(current_db_user)
        data = request.get_json()
        username = data.get("username")

        user = User.query.filter_by(username=username).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            # logout_user()
            return jsonify({"message": "User deleted successfully"})

        return jsonify({"message": "User not found"}), 404
    return jsonify({"message": "Not POST method"}), 403


@app.route("/api/check_authentication", methods=["GET"])
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


@app.route("/api/logout", methods=["GET"])
@login_required
def logout():
    """
    Log out the currently authenticated user.

    Returns:
        str: JSON response indicating successful logout.
    """
    logout_user()
    return jsonify({"message": "Logged out successfully"})


@app.route("/api/protected")
@login_required
def protected():
    """
    A protected route that requires authentication.

    Returns:
        str: JSON response with a welcome message for the authenticated user.
    """
    return jsonify(
        {"message": f"Hello, {current_user.username}! This is a protected route."}
    )


if __name__ == "__main__":
    # Start the server
    db.create_all()
    app.run(port=5001, debug=True)
