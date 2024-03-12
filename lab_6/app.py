from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

def load_grades():
  with open('grades.json', 'r') as file:
    return json.load(file)

def save_grades(grades):
  with open('grades.json', 'w') as file:
    json.dump(grades, file, indent=4)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/grades', methods=['GET', 'POST'])
def grades():
  grades = load_grades()
  if request.method == 'GET':
    return jsonify(grades), 200
  elif request.method == 'POST':
    data = request.json
    if data['name'] not in grades:
      grades[data['name']] = float(data['grade'])
      save_grades(grades)
      return jsonify(grades), 200
    else:
      return jsonify({"error": "Student already exists"}), 400

@app.route('/grades/<student_name>', methods=['GET', 'PUT', 'DELETE'])
def student_grade(student_name):
  grades = load_grades()
  if request.method == 'GET':
    grade = grades.get(student_name)
    if grade is not None:
      return jsonify({student_name: grade}), 200
    else:
      return jsonify({"error": "Student not found"}), 404
  elif request.method == 'PUT':
    if student_name in grades:
      data = request.json
      grades[student_name] = float(data['grade'])
      save_grades(grades)
      return jsonify(grades), 200
    else:
      return jsonify({"error": "Student not found"}), 404
  elif request.method == 'DELETE':
    if student_name in grades:
      del grades[student_name]
      save_grades(grades)
      return jsonify(grades), 200
    else:
      return jsonify({"error": "Student not found"}), 404

if __name__ == '__main__':
  app.run(debug=True)
