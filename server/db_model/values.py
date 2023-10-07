def init_values_model(db):
    class Values(db.Model):
        """
        Postgres table schema for values
        """

        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(
            db.String(1000), nullable=False
        )  # Name of the value as a string (maximum length 1000 characters)

        def __init__(self, name):
            """
            Initialize a new value object.

            Args:
                name (str): Name of the value.
            """
            self.name = name

    return Values
