# Function to print the sentence to the file
def print_to_file(sentence, repeat_count):
  # Open the file
  file = open("CompletedPunishment.txt", "w")

  # Write to the file
  for x in range(repeat_count):
    file.write(sentence + "\n")

  # Close the file
  file.close()

# Get user input sentence
user_input_sentence = input("Enter a sentence: ")

# Get user input repeat count
user_input_repeat_count = input("Enter a repeat count: ")

# Convert the count to an integer
try:
  user_input_repeat_count = int(user_input_repeat_count)
except ValueError:
  print("Invalid input: please enter only integers for the repeat count")

# Print the sentence to the file
print_to_file(user_input_sentence, user_input_repeat_count)