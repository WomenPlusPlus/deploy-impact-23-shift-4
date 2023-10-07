from flask_login import UserMixin


def init_company_model(db):
    class Company(db.Model, UserMixin):
        """
        Postgres table schema
        """

        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(80), unique=True, nullable=False)
        password = db.Column(
            db.String(128), nullable=False
        )  # Store the hashed password
        email = db.Column(db.String(120), unique=True, nullable=False)
        company_name = db.Column(db.String(80))  # Company name as a string
        address = db.Column(db.String(256))  # Address as a string
        linkedin_url = db.Column(db.String(256))  # URL to LinkedIn page as a string
        company_values = db.Column(
            db.ARRAY(db.String)
        )  # Company values as an array of strings
        job_offerings = db.Column(
            db.ARRAY(db.String)
        )  # Types of jobs offered as an array of strings
        contact_details = db.Column(db.JSONB)  # Contact details as a JSONB object
        kununu_url = db.Column(db.String(256))  # Kununu URL as a string
        positions_job_lists = db.Column(
            db.ARRAY(db.Integer)
        )  # Positions/job lists as an array of foreign keys (integer)

        def __init__(
            self,
            username,
            password,
            email,
            company_name,
            address,
            linkedin_url,
            company_values,
            job_offerings,
            contact_details,
            kununu_url,
            positions_job_lists,
        ):
            """
            Initialize a new company object.

            Args:
                # Your additional fields here
            """
            self.username = username
            self.password = password
            self.email = email
            self.company_name = company_name
            self.address = address
            self.linkedin_url = linkedin_url
            self.company_values = company_values
            self.job_offerings = job_offerings
            self.contact_details = contact_details
            self.kununu_url = kununu_url
            self.positions_job_lists = positions_job_lists

    return Company
