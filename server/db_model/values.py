from sqlalchemy.dialects.postgresql import UUID
import uuid


def init_values_model(db):
    class Values(db.Model):
        """
        Postgres table schema for values
        """

        id = db.Column(
            db.String(80),
            primary_key=True,
            default=str(uuid.uuid4()),
            unique=True,
            nullable=False,
        )
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

        def to_dict(self):
            """
            Convert the value object to a dictionary.
            """
            return {"id": self.id, "name": self.name}

    return Values
