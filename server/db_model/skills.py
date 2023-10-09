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
        category = db.Column(
            db.String(256), nullable=False
        )  # categorys: UX/UI, Backend, Frontend, Fullstack, Data, DevOps, QA, Product Manager

        def __init__(self, name, category):
            """
            Initialize a new skill object.

            Args:
                name (str): Name of the skill.
                category (str): category of the skill.
            """
            self.name = name
            self.category = category

    return Skills
