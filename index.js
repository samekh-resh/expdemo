const express = require("express")
var cors = require('cors')
const server = express() // this server cannot hear a single thing


//tell my server to let requests from 
server.use(cors())
//the middleware
server.use(express.json())

const PORT = process.env.PORT || 3000
// const PORT = 3000

const destinations =[]

const students = {
  dao: {
    name: "Dao",
    interest: ["tacos"],
    city: "Sac Town",
  },
  nikko: {
    name: "Nikko",
    interest: ["bananas"],
    city: "Detroit",
  },
  will: {
    name: "Will",
    interest: ["camaro", "frontier", "wrangler", "bananas"],
    city: "Detroit",
  },
  jose: {
    name: "jose",
    interest: ["tacos"],
    city: "Miami",
  },
};


server.get("/students", (req, res) => {
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

server.get("/students/name/:name", (req, res) =>{
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

server.get("/students/city/:city", (req, res) => {
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

server.get("/students/interest/:interest", (req, res) => {
  const { interest } = req.params;
  if (interest) {
    return res.send(
      Object.values(students).filter((student) =>
        student.interest.includes(interest.toLowerCase())
      )
    );
  }
});



server.listen(PORT, () =>{
    console.log("server...she listening...")
})

server.post("/destinations", (req, res) =>{

    const {destination, location, photo, description} = req.body;

    //validation to make sure I got what was expected
    if( !destination || 
        !location ||
        destination.length === 0 ||
        location.length === 0 
        ){
            return res.status(400).send({error: "destination and location are both require"})
    }
        //creates a new object to put into my db
    const newDest = {
        destination, 
        location, 
        photo: photo && photo.length !== 0 ? photo: "dshdjalfjknadlnjk",
        description: description ? description : ""
    }
    //adds newDest obj to the database
    destinations.push(newDest);
    //redirects to GET destinations 303 status code redirects to GET paths only
    res.redirect(303, "/destinations")
})


//an endpoint to get /nelly 
server.get("/", (req, res) =>{
    res.send("<h1> hey this is the landing page</h1>"
    )
})

server.get("/destinations", (req, res) =>{
    res.send(destinations)
})


//post request for servers. 

//two homeworks that we