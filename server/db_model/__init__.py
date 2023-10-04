from flask_sqlalchemy import SQLAlchemy 
from .company import init_company_model
from .candidate import init_candidate_model
from .user import init_user_model


db = SQLAlchemy()

User = init_user_model(db)
Candidate = init_candidate_model(db)
Company = init_company_model(db)
