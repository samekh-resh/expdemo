const express = require("express")
const { destinations } = require("../Models/destinations")
const destinationsRouter = express.Router()


destinationsRouter.post("/", async (req, res) =>{

    const {destination, location, photo, description} = req.body;
    //validation to make sure I got what was expected
    if( !destination || 
        !location ||
        destination.length === 0 ||
        location.length === 0 
        ){
            return res.status(400).send({error: "destination and location are both require"})
    }

     // create the unsplash api url with the api_key and the location and destination is passed in as a query

    // https://api.unsplash.com/
    const unsplashAPIURL = `https://api.unsplash.com/search/photos?query=${destination} ${location}&client_id=${process.env.SECRET_KEY}`
    // aBsjMciOfvBS8wtS6bqrAYVkShZLrGSBhQkqR0yhR70

    const {data} = await axios.get(unsplashAPIURL)
    console.log()
    const photos = data.results
    const randIdx = Math.floor(Math.random() * photos.length)
    //use either axious or node-fetch to get the photos. 
        //creates a new object to put into my db
    const newDest = {
        destination, 
        location, 
        // photo: photo && photo.length !== 0 ? photo: "dshdjalfjknadlnjk",
        photo: photos[randIdx].urls.small,
        description: description ? description : ""
    }
    //adds newDest obj to the database
    destinations.push(newDest);
    //redirects to GET destinations 303 status code redirects to GET paths only
    res.redirect(303, "/destinations")
})


destinationsRouter.get("/", (req, res) =>{
    res.send(destinations)
})


module.exports = {
    destinationsRouter
}