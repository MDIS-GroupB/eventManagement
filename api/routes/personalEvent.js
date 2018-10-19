const express = require('express')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router
    .route('/')
    // Get logged in user’s details
    .get(async (req, res) => {
        console.log(req)
        let event = await global.Event.find({
            eventProposer: req.user._id
        })
            .populate('venueId')
        // console.log(event)
        res.json(event)
    })


module.exports = router
