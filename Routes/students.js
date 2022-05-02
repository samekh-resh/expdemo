const express = require("express")
const { students } = require("../Models/students")
const studentsRouter = express.Router()



studentsRouter.get("/", (req, res) => {
  const { name, interest, city } = req.query;
  if (name) {
    const student = students[name.toLowerCase()];
    if (student) {
      return res.send(students[name]);
    }
    return res
      .status(404)
      .send({ error: `Student by the name of ${name} not found` });
  }
  let filteredStudents = Object.values(students);

  if (interest) {
    filteredStudents = filteredStudents.filter((student) =>
      student.interests.includes(interest.toLowerCase())
    );
  }

  if (city) {
    filteredStudents = filteredStudents.filter(
      (student) => student.city.toLowerCase() === city.toLowerCase()
    );
  }
  return res.send(filteredStudents);
});

studentsRouter.get("/name/:name", (req, res) =>{
    const { name } = req.params

    if (name) {
    const student = students[name.toLowerCase()];
    if (student) {
      return res.send(student);
    }
    return res
      .status(404)
      .send({ error: `Student by the name of ${name.toUpperCase()} not found` });
  }
})

studentsRouter.get("/city/:city", (req, res) => {
  const { city } = req.params;
  if (city) {
    return res.send(
      Object.values(students).filter(
        (student) => student.city.toLowerCase() === city.toLowerCase()
      )
    );
  }
  //returns the students who match the query parameters passed in (name, interest,)
  // return res.send(filteredStudents);
});

studentsRouter.get("/interest/:interest", (req, res) => {
    console.log( " this the parasm " + req.params.interest)
  const { interest } = req.params;
  console.log("this is it parsed and destructured; "+  interest)
  if (interest) {
    return res.send(
      Object.values(students).filter((student) =>
        // student.interest.includes(interest.toLowerCase())
        student.interest.includes(interest)

      )
    );
  }
});





module.exports = {
    studentsRouter
}