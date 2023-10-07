def init_values_model(db):
    class Values(db.Model):
        """
        Postgres table schema
        """

        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(80), unique=True, nullable=False)
        password = db.Column(
            db.String(128), nullable=False
        )  # Store the hashed password
        email = db.Column(db.String(120), unique=True, nullable=False)

        def __init__(
            self,
            username,
            password,
            email,
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
            self.email = email

    return Values
