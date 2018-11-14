// import React, { Component } from 'react'
// // import { getEventData } from "./../api/admin"

// // import { getEvent } from '../api/event'
// // import CircularProgress from 'material-ui/CircularProgress';
// // const bodyParser = require('body-parser');
// const express = require('express');
// const stripe = require('stripe')(keys.stripeSecretKey)

// const keys = require('../config/keys')
// const app = express();

// // //Body parser middleware
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: false }));

// app.post('/charge', (req, res) => {
//     const amount = 2500;

//     stripe.customers.create({
//         email: req.body.stripeEmail,
//         source: req.body.stripeToken
//     })
//         .then(customer => stripe.charges.create({
//             amount,
//             description: 'Web Development Ebook',
//             currency: 'usd',
//             customer: customer.id
//         }))
//         .then(charge => res.render('success'));
// });

// export default class LoginPage extends Component {

//     state = {

//     };

//     constructor(props) {
//         super()
//     }

//     async componentDidMount() {

//     }

//     render() {
//         return <>
//             <div class="col-md-6 text-center">
//                 <h1 class="display-3 mt-3 pt-5">
//                     web development ebook
//             </h1>
//                 <p class="lead">
//                     learn web development front ot back
//             </p>

//                 <form action="/charge" method="POST">
//                     <script src="https://checkout.stripe.com/checkout.js" class="stripe-button" data-key={keys.stripePushliableKey}
//                         data-amount="1" data-name="ebook" data-description="ebook writen by dk" data-image="/img/download2.jpg"
//                         data-locale="auto" data-currency="sgd">
//                     </script>
//                     <script>
//                         //Hide default stripe button
//                         document.getElementsByClassName('stripe-button-el')[0].style.display = 'none'
//                 </script>
//                     <button type="submit" class="btn btn-outline-dark text-white btn-lg">purchase for 0.1$</button>
//                 </form>

//             </div>

//         </>
//     }
// }