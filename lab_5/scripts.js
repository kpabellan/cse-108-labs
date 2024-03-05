async function reqGrade(reqType, reqBody, studentName) {
  const options = {
    method: reqType,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (reqBody) {
    options.body = JSON.stringify(reqBody);
  }

  if (studentName) {
    studentName = "/" + studentName;
  }

  const response = await fetch(`https://amhep.pythonanywhere.com/grades${studentName}`, options);

  const gradesJSON = await response.json();

  let table = "<tr><th>Student Name</th><th>Grade</th></tr>";

  for (let key in gradesJSON) {
    if (gradesJSON.hasOwnProperty(key)) {
      table += "<tr><td>" + `${key}` + "</td><td>" + `${gradesJSON[key]}` + "</td></tr>";
    }
  }

  document.getElementById("grades").innerHTML = table;
};

// See all grades
document.getElementById("allGrades").addEventListener("click", function() {
  reqGrade("GET", null, "");
});

// See student grade
document.getElementById("studentGrade").addEventListener("click", function() {
  reqGrade("GET", null, "Han Solo");
});

// Create grade
document.getElementById("createGrade").addEventListener("click", function() {
  let grade = {"name": "Han Solo", "grade": 50};
  reqGrade("POST", grade, "");
});

// Edit grade
document.getElementById("editGrade").addEventListener("click", function() {
  let name = "Han Solo";
  let grade = {"grade": 100};
  reqGrade("PUT", grade, name);
});

// Delete grade
document.getElementById("deleteGrade").addEventListener("click", function() {
  reqGrade("DELETE", null, "Han Solo");
});