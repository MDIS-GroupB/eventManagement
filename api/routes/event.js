const express = require('express')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router
.route('/venues')
// Get logged in user’s details
.get(async (req, res) => {
    let venues = await global.Venue.find()
    res.json(venues)
})


module.exports = router
