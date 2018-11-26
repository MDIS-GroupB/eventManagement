import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const CURRENCY = 'EUR';

const fromEuroToCent = amount => amount * 100;

const successPayment = data => {
    alert('Payment Successful');
};

const errorPayment = data => {
    alert('Payment Error');
};

const onToken = (amount, description) => token =>
    axios.post("http://localhost:8085/charge",
        {
            description,
            source: token.id,
            currency: 'SGD',
            amount: amount
        })
        .then(successPayment)
        .catch(errorPayment);

const Checkout = ({ name, description, amount }) =>
    <StripeCheckout
        name={name}
        description={description}
        amount={amount}
        token={onToken(amount, description)}
        currency='SGD'
        stripeKey={"pk_test_1tMRl4nbpoZl3Z3mlDrEjIf5"}
    />

export default Checkout;