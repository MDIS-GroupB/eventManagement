const express = require('express')
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)

const router = express.Router()

router
    //Charge route
    .post('/', (req, res) => {
        const amount = 2500;

        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken
        })
            .then(customer => stripe.charges.create({
                amount,
                description: 'Web Development Ebook',
                currency: 'usd',
                customer: customer.id
            }))
            .then(
                //Find noOfTickets from event where event_id===req.body.event_id
                //if noOfTickets >0 noOfTickets-- redirect to success page
                //else redirect to noTicket page
            )
            .then(charge => res.render('success'));
    });
//good to add error handling

module.exports = router