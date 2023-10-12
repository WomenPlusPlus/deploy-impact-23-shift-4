from flask_login import UserMixin
from sqlalchemy.dialects.postgresql import UUID
import uuid


def init_company_model(db):
    class Company(db.Model, UserMixin):
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
            db.ForeignKey("user.id"),
            nullable=False,
        )
        password = db.Column(
            db.String(128), nullable=False
        )  # Store the hashed password
        email = db.Column(db.String(120), unique=True, nullable=False)
        associations = db.Column(db.ARRAY(db.String), nullable=False)
        company_name = db.Column(db.String(80))  # Company name as a string
        address = db.Column(db.String(256))  # Address as a string
        logo = db.Column(db.String(256))  # Logo as a string
        linkedin_url = db.Column(db.String(256))  # URL to LinkedIn page as a string
        values = db.Column(db.ARRAY(db.String))  # Company values as an array of strings
        job_types = db.Column(
            db.ARRAY(db.String)
        )  # Types of jobs offered as an array of strings
        contact_details = db.Column(db.JSON)  # Contact details as a JSON object
        kununu_url = db.Column(db.String(256))  # Kununu URL as a string
        open_positions = db.Column(
            db.ARRAY(db.String)
        )  # Positions/job lists as an array of foreign keys (integer)

        def __init__(
            self,
            user_id,
            password,
            email,
            associations,
            company_name,
            logo=None,
            address=None,
            linkedin_url=None,
            values=None,
            job_types=None,
            contact_details=None,
            kununu_url=None,
            open_positions=None,
        ):
            """
            Initialize a new company object.

            Args:
                # Your additional fields here
            """
            self.user_id = user_id
            self.password = password
            self.email = email
            self.associations = associations
            self.company_name = company_name
            self.logo = logo
            self.address = address
            self.linkedin_url = linkedin_url
            self.values = values
            self.job_types = job_types
            self.contact_details = contact_details
            self.kununu_url = kununu_url
            self.open_positions = open_positions

        def to_dict(self):
            """
            Convert the company object to a dictionary.
            """
            return {
                "id": self.id,
                "user_id": self.user_id,
                "password": self.password,
                "email": self.email,
                "associations": self.associations,
                "company_name": self.company_name,
                "logo": self.logo,
                "address": self.address,
                "linkedin_url": self.linkedin_url,
                "values": self.values,
                "job_types": self.job_types,
                "contact_details": self.contact_details,
                "kununu_url": self.kununu_url,
                "open_positions": self.open_positions,
            }

    return Company
