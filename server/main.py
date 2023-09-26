from flask import Flask, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import LargeBinary
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    login_required,
    logout_user,
    current_user,
)
from passlib.hash import bcrypt 
from dotenv import load_dotenv

load_dotenv()
import os

# Constants
database_uri = os.environ.get("DATABASE_URI")
secret_key = os.environ.get("SECRET_KEY")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_uri
# Keep the server reloading on changes
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["SECRET_KEY"] = secret_key

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = "login"


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)   # Store the hashed password
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __init__(
        self,
        username,
        password_hash,
        email,
    ):
        """
        Initialize a new user object.

        Args:
            username (str): The user's username.
            email (str): The user's email address.
            password (str): The user's password (plaintext).
        """
        self.username = username
        self.password_hash = password_hash
        self.email = email


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
        print("REGISTRATION: ",password)

        # Check if the username already exists in the database
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({"message": "Username already exists"}), 400

        # Hash the password before saving it to the database using passlib
        hashed_password = bcrypt.hash(password)
        print("REGISTRATION",hashed_password)
        # Create a new user and save it to the database
        new_user = User(username=username, password_hash=hashed_password, email=email)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"})


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
            # Verify the password using passlib
            if bcrypt.verify(password, user.password_hash):
                # If the password is valid, mark the user as authenticated
                login_user(user)
                return jsonify({"message": "Login successful"})

        return jsonify({"message": "Invalid username or password"}), 401

@app.route("/delete_user", methods=["POST"])
@login_required
def delete_user():
    """
    Delete the currently authenticated user.

    Returns:
        str: JSON response indicating successful user deletion.
    """
    if request.method == "POST":
        print(current_user)
        current_db_user = User.query.get(current_user.id)
        print(current_db_user)
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
