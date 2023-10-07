def init_skills_model(db):
    class Skills(db.Model):
        """
        Postgres table schema for skills
        """

        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(256), nullable=False)  # Name of the skill as a string

        def __init__(self, name):
            """
            Initialize a new skill object.

            Args:
                name (str): Name of the skill.
            """
            self.name = name

    return Skills
