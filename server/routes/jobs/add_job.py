from flask import Blueprint, jsonify, request


def add_job_route(Jobs, db):
    add_job_bp = Blueprint("add_job", __name__)

    @add_job_bp.route("/api/add_job", methods=["POST"])
    def add_job():
        """ """
        if request.method == "POST":
            try:
                data = request.get_json()
                new_job = Jobs(**data)
                db.session.add(new_job)
                db.session.commit()
                return jsonify({"message": "Job added successfully"})
            except Exception as e:
                print(e)
                return jsonify({"message": "Error adding job"}), 500

    return add_job_bp
