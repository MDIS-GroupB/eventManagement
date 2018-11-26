const express = require('express')
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)

const router = express.Router()

const postStripeCharge = res => (stripeErr, stripeRes) => {
    console.log(typeof res)
    if (stripeErr) {
        res.status(500).send({ error: stripeErr });
    } else {
        res.status(200).send({ success: stripeRes });
    }
}

router
    //Charge route
    .post('/', (req, res) => {
        stripe.charges.create(req.body, postStripeCharge(res));
    })
//good to add error handling

module.exports = router