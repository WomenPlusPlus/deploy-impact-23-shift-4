from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

# DB models
from db_model.user import init_user_model
from db_model.company import init_company_model
from db_model.candidate import init_candidate_model
from db_model.association import init_association_model
from db_model.jobs import init_jobs_model
from db_model.skills import init_skills_model
from db_model.values import init_values_model

# Blueprints
from routes.auth import login
from routes.auth import register
from routes.auth import load_user
from routes.auth.logout import logout_bp
from routes.auth.protected import protected_bp
from routes.auth.check_auth import check_auth_bp
from routes.users import get_users
from routes.users import delete_user
from routes.users import find_user_type
from routes.candidates import get_candidates
from routes.candidates import update_candidate

# Env
from dotenv import load_dotenv

load_dotenv()
import os

# Constants
database_uri = os.environ.get("DATABASE_URI_TEST")
secret_key = os.environ.get("SECRET_KEY")

# App config
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_uri
# Keep the server reloading on changes
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["SECRET_KEY"] = secret_key

# Initialize CORS with your Flask app
CORS(
    app,
    resources={
        r"/api/*": {"origins": "http://localhost:3000", "supports_credentials": True}
    },
)

# Database
db = SQLAlchemy(app)
from sqlalchemy.dialects.postgresql import UUID

db.Column(UUID(as_uuid=True))


# Login manager
login_manager = LoginManager(app)
login_manager.login_view = "login"
login_manager.init_app(app)

# Models
User = init_user_model(db)
Candidate = init_candidate_model(db)
Company = init_company_model(db)
Association = init_association_model(db)
Jobs = init_jobs_model(db)
Skills = init_skills_model(db)
Values = init_values_model(db)

# Blueprints
app.register_blueprint(
    register.register_route(User, Candidate, Company, Association, db)
)
app.register_blueprint(login.login_route(User))
app.register_blueprint(logout_bp)
app.register_blueprint(check_auth_bp)
app.register_blueprint(protected_bp)
app.register_blueprint(delete_user.delete_user_route(User, Candidate, Company, db))
app.register_blueprint(find_user_type.find_user_type_route(User))
app.register_blueprint(get_users.get_all_users_route(User))
app.register_blueprint(load_user.load_user_route(User, login_manager))
app.register_blueprint(get_candidates.get_all_candidates_route(Candidate))
app.register_blueprint(update_candidate.update_candidate_route(Candidate, db))

if __name__ == "__main__":
    # Make sure the tables exist
    db.create_all()
    # Start the server
    app.run(port=5001, debug=True)
