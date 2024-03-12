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

  const response = await fetch(`http://localhost:5000/grades${studentName}`, options);

  if (response.status != 200) {
    alert("Failed request: try again");
    return;
  }

  const gradesJSON = await response.json();

  let table = "<tr><th>Student Name</th><th>Grade</th></tr>";

  for (let key in gradesJSON) {
    if (gradesJSON.hasOwnProperty(key)) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = key;
      const cleanKey = tempDiv.textContent || tempDiv.innerText || "";

      tempDiv.innerHTML = gradesJSON[key];
      const cleanValue = tempDiv.textContent || tempDiv.innerText || "";

      table += "<tr><td>" + cleanKey + "</td><td>" + cleanValue + "</td></tr>";
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
  const name = document.getElementById("studentGradeName").value;

  if (name === "") {
    alert("Please enter a student name");
    return;
  }

  document.getElementById("studentGradeName").value = "";

  reqGrade("GET", null, name);
});

// Create grade
document.getElementById("createGrade").addEventListener("click", function() {
  const name = document.getElementById("createGradeName").value;
  const grade = document.getElementById("createGradeGrade").value;

  if (name === "" || grade === "") {
    alert("Please enter a student name and grade");
    return;
  }

  document.getElementById("createGradeName").value = "";
  document.getElementById("createGradeGrade").value = "";

  const gradeBody = {"name": name, "grade": grade};
  reqGrade("POST", gradeBody, "");
});

// Edit grade
document.getElementById("editGrade").addEventListener("click", function() {
  const name = document.getElementById("editGradeName").value;
  const grade = document.getElementById("editGradeGrade").value;

  if (name === "" || grade === "") {
    alert("Please enter a student name and grade");
    return;
  }

  document.getElementById("editGradeName").value = "";
  document.getElementById("editGradeGrade").value = "";

  const gradeBody = {"grade": grade};
  reqGrade("PUT", gradeBody, name);
});

// Delete grade
document.getElementById("deleteGrade").addEventListener("click", function() {
  const name = document.getElementById("deleteGradeName").value;

  if (name === "") {
    alert("Please enter a student name");
    return;
  }

  document.getElementById("deleteGradeName").value = "";

  reqGrade("DELETE", null, name);
});