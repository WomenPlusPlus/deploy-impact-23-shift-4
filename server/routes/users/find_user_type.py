from flask import Blueprint, jsonify, request

def find_user_type_route(User):
    find_user_type_bp = Blueprint("find_user_type", __name__)

    @find_user_type_bp.route("/api/find_user_type", methods=["POST"])
    def find_user_type():
        """
        Find the user type of a given username.

        This route handles a POST request to find the user type associated with a
        given username by querying the database.

        Parameters (POST JSON data):
            - username (str): The username for which to find the user type.

        Returns:
            - JSON: A JSON response containing the user type associated with the
            provided username.

        Note:
            - If the username is not found in the database, it returns an empty
            JSON response.
        """
        try:
            if request.method == "POST":
                data = request.get_json()
                username = data.get("username")
                existing_user = User.query.filter_by(username=username).first()

                return jsonify({"user": existing_user.user_type})
        except Exception:
            pass

    return find_user_type_bp