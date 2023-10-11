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
from routes.auth.logout import logout_bp
from routes.auth.protected import protected_bp
from routes.auth.check_auth import check_auth_bp
from routes.auth.send_invite import send_invite_bp
from routes.users import get_users
from routes.users import delete_user
from routes.users import get_user_by_id
from routes.candidates import get_candidates
from routes.candidates import update_candidate
from routes.candidates import get_candidate_by_id
from routes.companies import get_companies
from routes.companies import update_company
from routes.companies import get_company_by_id
from routes.associations import get_associations
from routes.associations import update_association
from routes.associations import get_association_by_id
from routes.skills import get_skills
from routes.skills import add_skill
from routes.values import get_values
from routes.values import add_value

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
app.register_blueprint(send_invite_bp)
app.register_blueprint(get_users.get_all_users_route(User))
app.register_blueprint(delete_user.delete_user_route(User, Candidate, Company, db))
app.register_blueprint(get_user_by_id.get_user_by_id_route(User))
app.register_blueprint(get_candidates.get_all_candidates_route(Candidate))
app.register_blueprint(update_candidate.update_candidate_route(Candidate, db))
app.register_blueprint(get_candidate_by_id.get_candidate_by_id_route(Candidate))
app.register_blueprint(get_companies.get_all_companies_route(Company))
app.register_blueprint(update_company.update_company_route(Company, db))
app.register_blueprint(get_company_by_id.get_company_by_id_route(Company))
app.register_blueprint(get_associations.get_all_associations_route(Association))
app.register_blueprint(update_association.update_association_route(Association, db))
app.register_blueprint(get_association_by_id.get_association_by_id_route(Association))
app.register_blueprint(get_skills.get_all_skills_route(Skills))
app.register_blueprint(add_skill.add_skill_route(Skills, db))
app.register_blueprint(get_values.get_all_values_route(Values))
app.register_blueprint(add_value.add_value_route(Values, db))

if __name__ == "__main__":
    # Make sure the tables exist
    db.create_all()
    # Start the server
    app.run(port=5001, debug=True)
