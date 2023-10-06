from flask import Blueprint, jsonify, request

def delete_user_route(User, db):
    delete_user_bp = Blueprint("delete_user", __name__)

    @delete_user_bp.route("/api/delete_user", methods=["POST"])
    # @login_required
    def delete_user():
        """
        Delete the currently authenticated user.

        Returns:
            str: JSON response indicating successful user deletion.
        """
        if request.method == "POST":
            # print(current_user)
            # current_db_user = User.query.get(current_user.id)
            # print(current_db_user)
            data = request.get_json()
            username = data.get("username")

            user = User.query.filter_by(username=username).first()

            if user:
                db.session.delete(user)
                db.session.commit()
                # logout_user()
                return jsonify({"message": "User deleted successfully"})

            return jsonify({"message": "User not found"}), 404
        return jsonify({"message": "Not POST method"}), 403
    
    return delete_user_bp