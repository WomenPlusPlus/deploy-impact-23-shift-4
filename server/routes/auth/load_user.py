from flask import jsonify

def load_user(User, user_id):
    """
    Check if the user is authenticated.

    Returns:
        str: JSON response indicating whether the user is authenticated.
    """
    print("load_user", user_id)
    if user_id:
        user = User.query.get(user_id)
        if user:
            return jsonify({"isUser": True})
        else:
            return jsonify({"isUser": False})
    else:
        return jsonify({"isUser": False})
