const express = require('express')
const keys = require('../config/keys')

const router = express.Router()

router
    // Get payment page
    .get('/', (req, res) => {
        console.log("you have come to back end")
        res('index', {
            stripePublishableKey: keys.stripePushliableKey
        });
        console.log(paymentPage)
    })



module.exports = router
