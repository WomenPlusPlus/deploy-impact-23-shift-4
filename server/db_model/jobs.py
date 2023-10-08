from sqlalchemy.dialects.postgresql import UUID
import uuid


def init_jobs_model(db):
    class Jobs(db.Model):
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
        associations = db.Column(db.ARRAY(db.String), nullable=False)
        company_id = db.Column(db.String(80), nullable=False)  # Company ID as a string
        title = db.Column(db.String(256))  # Title as a string
        description = db.Column(db.String(1000))  # Description as a string
        values = db.Column(
            db.ARRAY(db.String)
        )  # Values as an array of foreign keys (integer)
        skills = db.Column(
            db.ARRAY(db.String)
        )  # Skills as an array of foreign keys (integer)
        hiring_process_duration = db.Column(
            db.String(256)
        )  # Interview process duration as a string
        posting_date = db.Column(db.Date)  # Posting date as a date
        matching_candidates = db.Column(
            db.ARRAY(db.String)
        )  # Matching candidates as an array of foreign keys (integer)
        salary = db.Column(
            db.Numeric(10, 2)
        )  # Salary as a numeric value with 2 decimal places
        location = db.Column(db.String(256))  # Location as a string

        def __init__(
            self,
            company_id,
            title,
            description=None,
            values=None,
            skills=None,
            hiring_process_duration=None,
            posting_date=None,
            matching_candidates=None,
            salary=None,
            location=None,
        ):
            """
            Initialize a new job object.

            Args:
                # Your additional fields here
            """
            self.company_id = company_id
            self.title = title
            self.description = description
            self.values = values
            self.skills = skills
            self.hiring_process_duration = hiring_process_duration
            self.posting_date = posting_date
            self.matching_candidates = matching_candidates
            self.salary = salary
            self.location = location

    return Jobs
