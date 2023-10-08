from flask_login import UserMixin
from sqlalchemy.dialects.postgresql import UUID
import uuid


def init_user_model(db):
    class User(db.Model, UserMixin):
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
        username = db.Column(db.String(80), unique=True, nullable=False)
        password = db.Column(
            db.String(128), nullable=False
        )  # Store the hashed password
        email = db.Column(db.String(120), unique=True, nullable=False)
        user_type = db.Column(db.String(120), unique=False, nullable=False)
        associations = db.Column(db.ARRAY(db.String), nullable=False)

        def __init__(self, username, password, email, user_type, associations):
            """
            Initialize a new user object.

            Args:
                username (str): The user's username.
                email (str): The user's email address.
                password (str): The user's password (plaintext).
            """
            self.username = username
            self.password = password
            self.email = email
            self.user_type = user_type
            self.associations = associations

    return User
