const express = require('express')
const util = require('util')
const router = express.Router()

router
    .post('/', (req, res) => {
        console.log("sending email and the passed para is")
        console.log(util.inspect(req.body, { showHidden: false, depth: null }))

        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dereknodejs123@gmail.com',
                pass: 'derek123@'
            }
        });

        const output = `
        <h3>Dear customer </h3>
    <p>you have purchase a ticket from us</p>
    <h3>ticket details</h3>
    <ul>
        <li> Event Name: ${req.body.name}</li>
        <li> Event Date: ${req.body.date}</li>
        <li> Venue Place: ${req.body.location}</li>
        <li> Hoster Name: ${req.body.hoster}</li>
        <li> Ticket Price: ${req.body.amount + ' ' + req.body.currency}</li>
    </ul>
    <h3>Thank you</h3>
    <p></p>
    `;

        var mailOptions = {
            from: 'dereknodejs123@gmail.com',
            to: 'dereknodejsrecip@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was 2 easy!',
            html: output
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    })

    .get('/', (res) => {
        console.log('test your shit working')
        res.json({ res: 'your shit is working' })
    })

module.exports = router