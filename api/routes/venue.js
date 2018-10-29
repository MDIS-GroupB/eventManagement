const express = require('express')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router
    // .route('/')
    // Get logged in user’s details
    .get('/', async (req, res) => {
        let venues = await global.Venue.find()
        res.json(venues)
    })

    .get('/:id', async (req, res) => {
        var id = req.params.id;
        let theVenue = await global.Venue.findOne({ _id: Object(id) },
            // function (err){
            //   if(err) throw err;
            // }
            //throw error seems crash the app
        )
        // res.json({
        //   works:true,
        //   products:theProduct,
        // })
        res.json(theVenue)
    })

module.exports = router
