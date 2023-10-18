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
        company_id = db.Column(
            db.String(80), db.ForeignKey("user.id"), nullable=False
        )  # Company ID as a string from the user table
        title = db.Column(db.String(256))  # Title as a string
        description = db.Column(db.String(1000))  # Description as a string
        values = db.Column(
            db.ARRAY(db.String)
        )  # Values as an array of foreign keys (integer)
        skills = db.Column(db.JSON)  # Skills as an array of foreign keys (integer)
        hiring_process_duration = db.Column(
            db.String(256)
        )  # Interview process duration as a string
        posting_date = db.Column(db.Date)  # Posting date as a date
        matching_candidates = db.Column(
            db.JSON
        )  # Matching candidates as an array of foreign keys (integer)
        salary = db.Column(
            db.Numeric(10, 2)
        )  # Salary as a numeric value with 2 decimal places
        location_city = db.Column(db.String(256))  # Location as a string
        location_country = db.Column(db.String(256))  # Location as a string
        work_location = db.Column(db.String(256))  # Job type as a string (hybrid, remote, etc.)
        employment_type = db.Column(db.String(256))  # Job type as a string (full-time, part-time, etc.)
        date_created = db.Column(db.DateTime, default=db.func.current_timestamp())

        def __init__(
            self,
            associations,
            company_id,
            title,
            description=None,
            values=None,
            skills=None,
            hiring_process_duration=None,
            posting_date=None,
            matching_candidates=None,
            salary=None,
            location_city=None,
            location_country=None,
            date_created=None,
            work_location=None,
            employment_type=None,
        ):
            """
            Initialize a new job object.

            Args:
                # Your additional fields here
            """
            self.company_id = company_id
            self.associations = associations
            self.title = title
            self.description = description
            self.values = values
            self.skills = skills
            self.hiring_process_duration = hiring_process_duration
            self.posting_date = posting_date
            self.matching_candidates = matching_candidates
            self.salary = salary
            self.location_city = location_city
            self.location_country = location_country
            self.date_created = date_created
            self.work_location = work_location
            self.employment_type = employment_type

        def to_dict(self):
            """
            Convert the job object to a dictionary.
            """
            return {
                "id": self.id,
                "associations": self.associations,
                "company_id": self.company_id,
                "title": self.title,
                "description": self.description,
                "values": self.values,
                "skills": self.skills,
                "hiring_process_duration": self.hiring_process_duration,
                "posting_date": self.posting_date.isoformat()
                if self.posting_date
                else None,
                "matching_candidates": self.matching_candidates,
                "salary": float(self.salary) if self.salary is not None else None,
                "location_city": self.location_city,
                "location_country": self.location_country,
                "date_created": self.date_created.isoformat(),
                "work_location": self.work_location,
                "employment_type": self.employment_type,
            }

    return Jobs
