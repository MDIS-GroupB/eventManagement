const express = require('express')

const router = express.Router()

router
    // .route('/')
    // Get user details
    .get('/', async (req, res) => {
        let personalDetails = await global.Personal.find({ userID: req.user._id })

        res.json(personalDetails)
    })

    .get('/getUserEmail', async (req, res) => {
        let email = await global.User.find({ _id: req.user._id }, { _id: 0, email: 1 }) //get only email field from the matching result
        res.json(email)
    })

module.exports = router
