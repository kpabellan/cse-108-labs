import json

def create_student(name, grade, grades):
  new_student = {name: grade}
  grades.update(new_student)
  store_grades(grades)

def get_grade(name, grades):
  if name in grades:
    return grades[name]
  else:
    return "Student not found"

def edit_grade(name, grade, grades):
  if name in grades:
    grades[name] = grade
    store_grades(grades)
  else:
    return "Student not found"

def delete_grade(name, grades):
  if name in grades:
    grades.pop(name)
    store_grades(grades)
  else:
    return "Student not found"

def load_grades():
  f = open('grades.txt')
  grades = json.load(f)
  f.close()
  return grades

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