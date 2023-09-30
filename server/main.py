from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    login_required,
    logout_user,
    current_user,
)
from passlib.hash import bcrypt 
from db_model.user import init_user_model
from db_model.company import init_company_model
from db_model.candidate import init_candidate_model
from dotenv import load_dotenv

load_dotenv()
import os

# Constants
database_uri = os.environ.get("DATABASE_URI")
secret_key = os.environ.get("SECRET_KEY")

# App config
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True # Keep the server reloading on changes
app.config["SECRET_KEY"] = secret_key

# Database
db = SQLAlchemy(app)

# Login manager
login_manager = LoginManager(app)
login_manager.login_view = "login"

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


@app.route("/register", methods=["POST"])
def register():
    if request.method == "POST":
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        email = data.get("email")
        user_type = data.get("user_type")  # Get user type from the request

        # Hash the password before saving it to the appropriate table
        hashed_password = bcrypt.hash(password)

        # Check if the username already exists in the appropriate table
        # if user_type == "candidate":
        #     existing_user = Candidate.query.filter_by(username=username).first()
        # elif user_type == "company":
        #     existing_user = Company.query.filter_by(username=username).first()
        # else:
        # if existing_user:
        #     return jsonify({"message": "Username already exists"}), 400

        new_user = User(username=username, password=hashed_password, email=email, user_type=user_type)
        db.session.add(new_user)
        db.session.commit()

        # Create a new user and save it to the appropriate table
        if user_type == "candidate":
            new_user = Candidate(username=username, password=hashed_password, email=email)
            db.session.add(new_user)
            db.session.commit()
        elif user_type == "company":
            new_user = Company(username=username, password=hashed_password, email=email)
            db.session.add(new_user)
            db.session.commit()
        else:
            return jsonify({"message": "Invalid user type"}), 400

        return jsonify({"message": "User registered successfully"})

@app.route("/find_user", methods=["POST"])
def find_user_type():
    try:
        if request.method == "POST":
            data = request.get_json()
            username = data.get("username")
            existing_user = User.query.filter_by(username=username).first()
            print(existing_user.user_type)
            return jsonify({"user": existing_user.user_type})
    except Exception:
        pass


@app.route("/login", methods=["POST"])
def login():
    """
    Handle user login.

    Accepts a POST request with username and password. Validates the credentials
    and logs in the user if valid.

    Returns:
        str: JSON response indicating success or failure of login.
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
                return jsonify({"message": "Login successful"})
            else:
                return jsonify({"message": "Invalid username or password"}), 401
        else:
            return jsonify({"message": "User is not registered"}), 401

@app.route("/delete_user", methods=["POST"])
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

@app.route("/check_authentication", methods=["GET"])
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

@app.route("/logout", methods=["GET"])
@login_required
def logout():
    """
    Log out the currently authenticated user.

    Returns:
        str: JSON response indicating successful logout.
    """
    logout_user()
    return jsonify({"message": "Logged out successfully"})


@app.route("/protected")
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
    db.create_all()
    app.run(port=5001, debug=True)
