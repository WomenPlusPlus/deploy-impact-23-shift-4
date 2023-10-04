from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import (
    LoginManager,
    login_user,
    login_required,
    current_user,
)
from passlib.hash import bcrypt
from dotenv import load_dotenv
# import blueprints
from routes.register_route import register_bp
from routes.protected_route import protected_bp
from routes.login_route import login_bp
from routes.delete_user_route import delete_user_bp
from routes.api_check_authentication import api_check_authentication_bp
from routes.logout_route import logout_bp
from routes.find_user_route import find_user_bp
from db_model import User, Candidate, Company

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


# Register blueprints
app.register_blueprint(register_bp)
app.register_blueprint(protected_bp)
app.register_blueprint(login_bp)
app.register_blueprint(delete_user_bp)
app.register_blueprint(api_check_authentication_bp)
app.register_blueprint(logout_bp)
app.register_blueprint(find_user_bp)

if __name__ == "__main__":
    # Start the server
    db.create_all()
    app.run(port=5001, debug=True)