const express = require('express')

const router = express.Router()

router
    // .route('/')
    // Get user details
    .get('/', async (req, res) => {
        let personalDetails = await global.Personal.findOne({ userId: req.user._id })
        let orderHistory = await global.Booking.find({ buyer: req.user._id }).populate('eventId')
        let sellingHistory = await global.Booking.find({ seller: req.user._id }).populate('eventId')
        res.json({
            personalDetails: personalDetails,
            sellingHistory: sellingHistory,
            orderHistory: orderHistory
        })
    })

    .get('/getUserEmail', async (req, res) => {
        let email = await global.User.find({ _id: req.user._id }, { _id: 0, email: 1 }) //get only email field from the matching result
        res.json(email)
    })

module.exports = router
