import json

# Create a student name and grade
def create_student(name, grade, grades):
  new_student = {name: grade}
  grades.update(new_student)
  store_grades(grades)

# Ask or a grade, given the full name of the student
def get_grade(name, grades):
  name_lower = name.lower()
  for student_name, grade in grades.items():
      if student_name.lower() == name_lower:
          return grade
  return "Student not found"

# Edit a grade
def edit_grade(name, grade, grades):
  name_lower = name.lower()
  for student_name in grades.keys():
      if student_name.lower() == name_lower:
          grades[student_name] = grade
          store_grades(grades)
          return
  return "Student not found"

# Delete a grade
def delete_grade(name, grades):
  name_lower = name.lower()
  for student_name in grades.keys():
      if student_name.lower() == name_lower:
          grades.pop(student_name)
          store_grades(grades)
          return
  return "Student not found"

# Load grades
def load_grades():
  f = open('grades.txt')
  grades = json.load(f)
  f.close()
  return grades

# Store grades
def store_grades(grades):
  with open('grades.txt', 'w') as f:
    json.dump(grades, f, indent=3, ensure_ascii=False)

def main():
  grades = load_grades()
  choice = int(input("1: Create a student name and grade\n2: Ask or a grade, given the full name of the student\n3: Edit a grade\n4: Delete a grade\nEnter choice: "))
  
  if choice == 1:
    name = input("Enter student name: ")
    grade = input("Enter student grade: ")
    create_student(name, grade, grades)
  elif choice == 2:
    name = input("Enter student name: ")
    grade = get_grade(name, grades)
    print(grade)
  elif choice == 3:
    name = input("Enter student name: ")
    grade = input("Enter new student grade: ")
    edit_grade(name, grade, grades)
  elif choice == 4:
    name = input("Enter student name: ")
    delete_grade(name, grades)

main()