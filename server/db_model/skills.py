from sqlalchemy.dialects.postgresql import UUID
import uuid


def init_skills_model(db):
    class Skills(db.Model):
        """
        Postgres table schema for skills
        """

        id = db.Column(
            db.String(80),
            primary_key=True,
            default=str(uuid.uuid4()),
            unique=True,
            nullable=False,
        )
        name = db.Column(db.String(256), nullable=False)
        field = db.Column(
            db.String(256), nullable=False
        )  # fields: UX/UI, Backend, Frontend, Fullstack, Data, DevOps, QA, Product Manager

        def __init__(self, name, field):
            """
            Initialize a new skill object.

            Args:
                name (str): Name of the skill.
                field (str): field of the skill.
            """
            self.name = name
            self.field = field

        def to_dict(self):
            """
            Convert the skill object to a dictionary.
            """
            return {
                "id": self.id,
                "name": self.name,
                "field": self.field,
            }

    return Skills
