async function allGrades() {
  const response = await fetch("https://amhep.pythonanywhere.com/grades", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const gradesText = await response.text();
  const gradesJSON = await JSON.parse(gradesText);

  let table = "<tr><th>Student Name</th><th>Grade</th></tr>";

  for (let key in gradesJSON) {
    if (gradesJSON.hasOwnProperty(key)) {
      table += "<tr><td>" + `${key}` + "</td><td>" + `${gradesJSON[key]}` + "</td></tr>";
    }
  }

  document.getElementById("grades").innerHTML = table;
}

document.getElementById("allGrades").addEventListener("click", function() {
  allGrades();
});
