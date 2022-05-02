const express = require("express")
var cors = require('cors')
const axios = require("axios")
require('dotenv').config()
const server = express() // this server cannot hear a single thing


//tell my server to let requests from other http server -- do more research on cors
server.use(cors())
//the middleware
server.use(express.json())

const PORT = process.env.PORT || 3000


const {studentsRouter} = require("./Routes/students")
const {destinationsRouter } = require("./Routes/destinations")
// const PORT = 3000


server.use("/students", studentsRouter)
server.use("/destinations", destinationsRouter)

//an endpoint to get /nelly 
server.get("/", (req, res) =>{
    res.send("<h1> hey this is the landing page</h1>"
    )
})


server.listen(PORT, () =>{
    console.log("server...she listening...")
})




//post request for servers. 

//two homeworks that we