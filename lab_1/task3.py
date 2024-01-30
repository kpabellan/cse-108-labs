# Ask for the word to search for
user_input = input("Enter a word: ")

# Function to extract words from the file
def extract_words():
  with open("PythonSummary.txt", "r") as f:
    content = f.read()
    words = content.split()
    cleaned_words = [word.lower().strip(".,!?") for word in words]
    return cleaned_words
  
# Function to find the number of times the word appears in the file
def find_word_count(user_input):
  words = extract_words()
  count = 0
  for x in range(len(words)):
    if user_input.lower() in words[x]:
      count += 1
  return count

# Print the number of times the word appears in the file
print(find_word_count(user_input))