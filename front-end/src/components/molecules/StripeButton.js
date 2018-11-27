import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const CURRENCY = 'EUR';
const fromEuroToCent = amount => amount * 100;
const util = require('util')

const successPayment = data => {
    alert('Payment Successful');
};

const errorPayment = data => {
    alert('Payment Error');
};

const sendEmail = (name, description, date, location, hoster, amount) => {
    console.log("the passed para is")
    console.log(name, description, date, location, hoster, amount)
    axios.post("http://localhost:8085/emailer",
        {
            name,
            description,
            date,
            location,
            hoster,
            amount,
            currency: 'SGD'
        })
}

const onToken = (name, description, date, location, hoster, amount) => token =>
    axios.post("http://localhost:8085/charge",
        {
            description,
            source: token.id,
            currency: 'SGD',
            amount: amount
        })
        .then(successPayment)
        .then(sendEmail(name, description, date, location, hoster, amount))
        .catch(errorPayment);

const Checkout = ({ name, description, date, location, hoster, amount }) => {
    console.log("the passed in values")
    console.log({
        name, description, date, location, hoster, amount
    })
    return (
        <StripeCheckout
            name={name}
            description={description}
            date={date}
            location={location}
            hoster={hoster}
            amount={amount}
            token={onToken(name, description, date, location, hoster, amount)}
            currency={'SGD'}
            stripeKey={"pk_test_RqzhsUSIsZ2vzPUOG15tMaao"}
        />)
}

export default Checkout;