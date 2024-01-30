# Get user input
user_input = input("Two or more numbers separated by spaces: ")

# Split the input string into a list of strings
user_input_list = user_input.split()

# Check if the list has at least two elements
if len(user_input_list) < 2:
  print("Invalid input: please enter two or more numbers separated by spaces")
  exit()

# Convert the list of strings into a list of integers
try:
  user_input_list = [int(i) for i in user_input_list]
  print(sum(user_input_list))
except ValueError:
  print("Invalid input: please enter only integers separated by spaces")