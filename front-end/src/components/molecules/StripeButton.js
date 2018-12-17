import React from 'react'
import axios from 'axios';
import { createBooking } from '../../api/event';
import StripeCheckout from 'react-stripe-checkout';

const CURRENCY = 'EUR';
const fromEuroToCent = amount => amount * 100;
const util = require('util')

const successPayment = data => {
    alert('Payment Successful');
    return data
};

const errorPayment = data => {
    console.log(data)
    alert('Payment Error');
};

const sendEmail = (name, description, date, location, hoster, amount, email) => {
    console.log("the passed para is")
    console.log(name, description, date, location, hoster, amount, email)
    axios.post("http://localhost:8085/emailer",
        {
            name,
            description,
            date,
            location,
            hoster,
            amount,
            email,
            currency: 'SGD'
        })
}

const countDownTicket = (eventId) => {
    console.log("count down ticket api triggered")
    console.log("the passed event Id is " + eventId)
    axios.patch(`http://localhost:8085/personalEvent/${eventId}`)
}

const onToken = (name, description, date, location, hoster, amount, ticket, email, eventId) => token => {
    if (ticket > 0) {
        axios.post("http://localhost:8085/charge",
            {
                charge: {
                    description,
                    source: token.id,
                    currency: 'SGD',
                    amount: amount
                },
                eventId,
            })
            .then(successPayment)
            .then((data) => {
                createBooking({ eventId: eventId, successData: data.data.success })
            })
            // .then(countDownTicket(eventId))
            // .then(sendEmail(name, description, date, location, hoster, amount, email))
            .catch(errorPayment);
    }
    else {
        alert('No Ticket left');
    }
}

const Checkout = ({ name, description, date, location, hoster, amount, ticket, email, eventId }) => {
    console.log("the passed in values")
    console.log(
        name, description, date, location, hoster, amount, ticket, email, eventId
    )

    return (
        <StripeCheckout
            name={name}
            description={description}
            date={date}
            location={location}
            hoster={hoster}
            amount={amount}
            ticket={ticket}
            email={email}
            eventId={eventId}
            token={onToken(name, description, date, location, hoster, amount, ticket, email, eventId)}
            currency={'SGD'}
            stripeKey={"pk_test_RqzhsUSIsZ2vzPUOG15tMaao"}
        />)
}

export default Checkout;