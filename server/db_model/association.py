from flask_login import UserMixin
from sqlalchemy.dialects.postgresql import UUID
import uuid


def init_association_model(db):
    class Association(db.Model, UserMixin):
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
        password = db.Column(db.String(128), nullable=False)
        email = db.Column(db.String(120), unique=True, nullable=False)
        association_name = db.Column(db.String(80))
        address = db.Column(db.String(256))
        url = db.Column(db.String(256))  # URL to associations page as a string
        contact_details = db.Column(db.JSON)

        def __init__(
            self,
            user_id,
            password,
            email,
            association_name=None,
            address=None,
            url=None,
            contact_details=None,
        ):
            """
            Initialize a new association object.

            Args:
                # Your additional fields here
            """
            self.user_id = user_id
            self.password = password
            self.email = email
            self.association_name = association_name
            self.address = address
            self.url = url
            self.contact_details = contact_details

    return Association
