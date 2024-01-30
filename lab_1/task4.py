class class_schedule:
  def __init__(self):
    self.classes = []

  def read_classes_input(self, filename):
    with open(filename, "r") as f:
      course_count = int(f.readline().strip())
      for line in range(course_count):
        course_department = f.readline().strip() # Line 1
        course_number = f.readline().strip() # Line 2
        course_name = f.readline().strip() # Line 3
        course_credits = f.readline().strip() # Line 4
        lecture_days = f.readline().strip() # Line 5
        start_time = f.readline().strip() # Line 6
        end_time = f.readline().strip() # Line 7
        average_grade = f.readline().strip() # Line 8
        self.classes.append({
          "index": line + 1,
          "department": course_department,
          "number": course_number,
          "name": course_name,
          "credits": course_credits,
          "days": lecture_days,
          "start_time": start_time,
          "end_time": end_time,
          "average_grade": average_grade
        })

  def return_formatted_classes(self):
    output = ""
    for course in self.classes:
      output += f"COURSE {course['index']}: {course['department']}{course['number']}: {course['name']}\n"
      output += f"Number of Credits: {course['credits']}\n"
      output += f"Days of Lectures: {course['days']}\n"
      output += f"Lecture Time: {course['start_time']} - {course['end_time']}\n"
      output += f"Stat: on average, students get {course['average_grade']}% in this course"
      
      if (course['index'] != len(self.classes)):
        output += "\n\n"

    return output

class_schedule = class_schedule()
class_schedule.read_classes_input("classesInput.txt")
formatted_schedule = class_schedule.return_formatted_classes()
print(formatted_schedule)