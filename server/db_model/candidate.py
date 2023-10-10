from flask_login import UserMixin
from sqlalchemy.dialects.postgresql import UUID
import uuid


def init_candidate_model(db):
    class Candidate(db.Model, UserMixin):
        """
        Postgres table schema
        """

        id = db.Column(
            db.String(80),
            primary_key=True,
            default=str(uuid.uuid4()),
            unique=True,
            nullable=False,
        )
        user_id = db.Column(
            db.String(80),
            db.ForeignKey("user_id"),
            nullable=False,
        )
        password = db.Column(
            db.String(128), nullable=False
        )  # Store the hashed password
        email = db.Column(db.String(120), unique=True, nullable=False)
        associations = db.Column(db.ARRAY(db.String), nullable=False)
        first_name = db.Column(db.String(80))  # First name as a string
        last_name = db.Column(db.String(80))  # Last name as a string
        preferred_name = db.Column(db.String(80))  # Preferred name as a string
        cv_reference = db.Column(db.String(256))  # CV reference as a string
        searched_job = db.Column(db.JSON)  # Type of job searching as JSON
        address = db.Column(db.String(256))  # Address as a string
        phone_number = db.Column(db.String(20))  # Phone number as a string
        birth_date = db.Column(db.Date)  # Birth date as a date
        work_permit = db.Column(db.String(80))  # Work permit as a string
        notice_period = db.Column(db.String(80))  # Notice period as a string
        job_status = db.Column(db.String(256))  # Job status as an integer
        company_type = db.Column(
            db.ARRAY(db.String)
        )  # Type of company as an array of strings
        matching_jobs = db.Column(
            db.ARRAY(db.Integer)
        )  # Matching jobs as an array of foreign keys (integer)
        matching_companies = db.Column(
            db.ARRAY(db.Integer)
        )  # Matching companies as an array of foreign keys (integer)
        values = db.Column(db.ARRAY(db.String))  # Values as an array of strings
        skills = db.Column(db.JSON)  # Skills as a JSON array of objects
        languages = db.Column(db.JSON)  # Languages as a JSON array of objects

        def __init__(
            self,
            user_id,
            password,
            email,
            associations,
            first_name=None,
            last_name=None,
            preferred_name=None,
            cv_reference=None,
            values=None,
            searched_job=None,
            address=None,
            phone_number=None,
            birth_date=None,
            work_permit=None,
            notice_period=None,
            job_status=None,
            company_type=None,
            matching_jobs=None,
            matching_companies=None,
            skills=None,
            languages=None,
        ):
            """
            Initialize a new candidate object.

            Args:
                # Your additional fields here
            """
            self.user_id = user_id
            self.password = password
            self.email = email
            self.associations = associations
            self.first_name = first_name
            self.last_name = last_name
            self.preferred_name = preferred_name
            self.cv_reference = cv_reference
            self.values = values
            self.searched_job = searched_job
            self.address = address
            self.phone_number = phone_number
            self.birth_date = birth_date
            self.work_permit = work_permit
            self.notice_period = notice_period
            self.job_status = job_status
            self.company_type = company_type
            self.matching_jobs = matching_jobs
            self.matching_companies = matching_companies
            self.skills = skills
            self.languages = languages

    return Candidate
