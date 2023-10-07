from flask_login import UserMixin

def init_skills_model(db):
    class Skills(db.Model, UserMixin):
        """
        Postgres table schema
        """

        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(80), unique=True, nullable=False)

        def __init__(
            self,
            username,
            password,
        ):
            """
            Initialize a new user object.

            Args:
                username (str): The user's username.
                email (str): The user's email address.
                password (str): The user's password (plaintext).
            """
            self.username = username
            self.password = password

    return Skills
