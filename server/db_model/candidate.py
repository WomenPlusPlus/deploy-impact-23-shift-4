from flask_login import UserMixin


def init_candidate_model(db):
    class Candidate(db.Model, UserMixin):
        """
        Postgres table schema
        """

        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(80), unique=True, nullable=False)
        password = db.Column(
            db.String(128), nullable=False
        )  # Store the hashed password
        email = db.Column(db.String(120), unique=True, nullable=False)
        first_name = db.Column(db.String(80))  # First name as a string
        last_name = db.Column(db.String(80))  # Last name as a string
        preferred_name = db.Column(db.String(80))  # Preferred name as a string
        cv_reference = db.Column(db.String(256))  # CV reference as a string
        values = db.Column(db.ARRAY(db.String))  # Values as an array of strings
        type_of_job_searching = db.Column(db.JSONB)  # Type of job searching as JSONB
        address = db.Column(db.String(256))  # Address as a string
        phone_number = db.Column(db.String(20))  # Phone number as a string
        birth_date = db.Column(db.Date)  # Birth date as a date
        work_permit = db.Column(db.String(80))  # Work permit as a string
        notice_period = db.Column(db.String(80))  # Notice period as a string
        job_status = db.Column(db.Integer)  # Job status as an integer
        type_of_company = db.Column(
            db.ARRAY(db.String)
        )  # Type of company as an array of strings
        matching_jobs = db.Column(
            db.ARRAY(db.Integer)
        )  # Matching jobs as an array of foreign keys (integer)
        matching_companies = db.Column(
            db.ARRAY(db.Integer)
        )  # Matching companies as an array of foreign keys (integer)

        def __init__(
            self,
            username,
            password,
            email,
            first_name,
            last_name,
            preferred_name,
            cv_reference,
            values,
            type_of_job_searching,
            address,
            phone_number,
            birth_date,
            work_permit,
            notice_period,
            job_status,
            type_of_company,
            matching_jobs,
            matching_companies,
        ):
            """
            Initialize a new candidate object.

            Args:
                # Your additional fields here
            """
            self.username = username
            self.password = password
            self.email = email
            self.first_name = first_name
            self.last_name = last_name
            self.preferred_name = preferred_name
            self.cv_reference = cv_reference
            self.values = values
            self.type_of_job_searching = type_of_job_searching
            self.address = address
            self.phone_number = phone_number
            self.birth_date = birth_date
            self.work_permit = work_permit
            self.notice_period = notice_period
            self.job_status = job_status
            self.type_of_company = type_of_company
            self.matching_jobs = matching_jobs
            self.matching_companies = matching_companies

    return Candidate
