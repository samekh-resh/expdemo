//require express

// const { application } = require("express")
const express = require("express")

const server = express() // this server cannot hear a single thing

const PORT = 3000

server.listen(PORT, () =>{
    console.log("server...she listening...")
})


//an endpoint to get /nelly 
server.get("/samekh", (req, res) =>{
    res.send("<h1> hi i'm samekh! </h1>"
    )
})


//two homeworks that we