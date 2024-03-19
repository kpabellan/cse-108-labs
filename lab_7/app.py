from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///grades.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class Grade(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    grade = db.Column(db.Float, nullable=False)

with app.app_context():
    db.create_all()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/grades", methods=["GET", "POST"])
def grades():
    if request.method == "GET":
        grades_list = Grade.query.all()
        return jsonify({grade.name: grade.grade for grade in grades_list}), 200
    elif request.method == "POST":
        data = request.json
        existing_grade = Grade.query.filter_by(name=data["name"]).first()
        if not existing_grade:
            new_grade = Grade(name=data["name"], grade=float(data["grade"]))
            db.session.add(new_grade)
            db.session.commit()
            grades_list = Grade.query.all()
            return jsonify({grade.name: grade.grade for grade in grades_list}), 200
        else:
            return jsonify({"error": "Student already exists"}), 400

@app.route("/grades/<student_name>", methods=["GET", "PUT", "DELETE"])
def student_grade(student_name):
    grade = Grade.query.filter_by(name=student_name).first()
    if request.method == "GET":
        if grade:
            return jsonify({grade.name: grade.grade}), 200
        else:
            return jsonify({"error": "Student not found"}), 404
    elif request.method == "PUT":
        if grade:
            data = request.json
            grade.grade = float(data["grade"])
            db.session.commit()
            grades_list = Grade.query.all()
            return jsonify({grade.name: grade.grade for grade in grades_list}), 200
        else:
            return jsonify({"error": "Student not found"}), 404
    elif request.method == "DELETE":
        if grade:
            db.session.delete(grade)
            db.session.commit()
            grades_list = Grade.query.all()
            return jsonify({grade.name: grade.grade for grade in grades_list}), 200
        else:
            return jsonify({"error": "Student not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)