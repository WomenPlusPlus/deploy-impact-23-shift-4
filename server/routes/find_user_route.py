from flask import  request, jsonify, Blueprint
from db_model import User

find_user_bp =Blueprint("find_user", __name__)

@find_user_bp.route("/api/find_user", methods=["POST"])
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

            if existing_user:
                return jsonify({"user": existing_user.user_type})
            else:
                return jsonify({"user": "User not found"})  # Or any appropriate response
    except Exception as e:
        # Log the exception or handle it appropriately
        print(f"An error occurred: {str(e)}")
        return jsonify({"error": "An error occurred"})  # Provide an error response

    # Provide a default response in case of an unexpected issue
    return jsonify({"error": "An unexpected error occurred"})