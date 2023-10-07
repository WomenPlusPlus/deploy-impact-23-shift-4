from flask_login import UserMixin

def init_jobs_model(db):
    class Jobs(db.Model):
        """
        Postgres table schema
        """

        id = db.Column(db.Integer, primary_key=True)

        def __init__(
            self,

        ):
            """
            Initialize a new user object.

            Args:
                username (str): The user's username.
                email (str): The user's email address.
                password (str): The user's password (plaintext).
            """


    return Jobs
