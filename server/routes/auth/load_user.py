from flask import Blueprint

def load_user_route(User, login_manager):
    load_user_bp = Blueprint("load_user", __name__)

    @load_user_bp.route("/api/load_user", methods=["GET"])
    @login_manager.user_loader
    def load_user(user_id):
        """
        Load a user by their user ID.

        Args:
            user_id (int): The user's ID.

        Returns:
            User: The User object associated with the provided user ID.
        """
        return User.query.get(int(user_id))
    
    return load_user_bp