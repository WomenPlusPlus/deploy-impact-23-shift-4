from flask import Blueprint, jsonify, request


def get_all_skills_route(Skills):
    get_all_skills_bp = Blueprint("get_skills", __name__)

    @get_all_skills_bp.route("/api/get_all_skills", methods=["GET"])
    def get_all_skills():
        """
        Get all skills from the database.

           Returns:
               A JSON object containing all skills in the database.
        """
        try:
            if request.method == "GET":
                skills = Skills.query.all()
                result = []

            for skill in skills:
                skill_data = {
                    "id": skill.id,
                    "name": skill.name,
                    "category": skill.category,
                }
                result.append(skill_data)

            return jsonify({"skills": result}), 200
        except Exception as e:
            jsonify({"message": f"Error getting skills: {e}"}), 500

        return jsonify({"skills": []})

    return get_all_skills_bp
