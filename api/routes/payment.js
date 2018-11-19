const express = require('express')
const keys = require('../config/keys')
const router = express.Router();
// import indexPage from '../views/index.handlebars';

const fs = require('fs');

router
    // Get payment page
    .get('/', (req, res) => {
        console.log("you have come to back end")
        console.log(process.cwd())

        // fs.readFile('views/index.handlebars', 'utf8', function read(err, data) {
        //     if (err) {
        //         throw err;
        //     }
        //     content = data;

        //     // Invoke the next step here however you like
        //     console.log(content);   // Put all of the code here (not the best solution)
        //     // processFile();          // Or put the next step in a function and invoke it
        // });
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('views/index.handlebars', 'utf8', function (error, data) {
            if (error) {
                res.write(404);
                res.write('File not found');
            } else {
                console.log(data);
                res.write(data);
            }
            res.end();
        })

        // res.write(indexPage, {
        //     stripePublishableKey: keys.stripePushliableKey
        // });
        // console.log(paymentPage)
    })


module.exports = router
