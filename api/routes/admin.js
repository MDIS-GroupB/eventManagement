const express = require('express')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router
    .route('/event')
    // Get logged in user’s details
    .get(async (req, res) => {
        let events = await global.Event.find();

        res.json(events)
    })


module.exports = router
