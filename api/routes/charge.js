const express = require('express')
const keys = require('../config/keys')
const stripe = require('stripe')('sk_test_EZF4ILlvdn0YuTh3fJs2VU1q')
const util = require('util')
const router = express.Router()

const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
        res.status(500).send({ error: stripeErr });
    } else {
        // createBooking(stripeRes)
        res.status(200).send({ success: stripeRes });
    }
}


router
    //Charge route
    .post('/', (req, res) => {
        stripe.charges.create(
            req.body.charge,
            postStripeCharge(res)
        )
    })

    .post('/booking', async (req, res) => {
        const eventId = req.body.eventId
        const userId = req.user._id
        const stripeId = req.body.successData.id

        let event = await global.Event.findById(eventId)
        let booking = await global.Booking.create({
            eventId: eventId,
            buyer: userId,
            seller: event.eventProposer,
            price: event.price,
            stripeRef: stripeId
        })
        console.log('booking')
        console.log(booking)
        res.json({ data: null })
    })
//good to add error handling

module.exports = router