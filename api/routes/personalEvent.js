const express = require('express')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router
    // .route('/')
    // Get logged in user’s details
    .get('/', async (req, res) => {
        console.log(req)
        let event = await global.Event.find({
            eventProposer: req.user._id
        }).populate('venueId')
        // console.log(event)
        res.json(event)
    })

    .post('/', async (req, res) => {
        console.log("you comed to backend api")
        console.log(req.body)
        // console.log(data.noOfTickets)

        let newEvent = await global.Event.create({
            name: req.body.name,
            noOfTickets: req.body.noOfTickets,
            price: req.body.price,
            dateAndTime: req.body.dateAndTime,
            description: req.body.description,
            eventProposer: req.user._id,
            venueId: req.body.venueId
            // venueId:req.venueId.venueId
        })
        console.log("inserted!")
        console.log(newEvent)
        res.json({ test: "j" })
    })

    .patch('/:id', async (req, res) => {
        console.log("you are patching tickets number")
        // var updateObject = req.body;
        var id = req.params.id;
        var ticketNum = 2;
        await global.Event.update({ _id: Object(id) }, { $inc: { noOfTickets: -1 } });
        let updatedProduct = await global.Event.findOne({ _id: Object(id) })

        res.json({
            works: true,
            products: updatedProduct,
        })
    })

    .delete('/:id', async (req, res) => {
        var id = req.params.id;
        await global.Event.deleteOne({ _id: Object(id) });

        res.json({
            works: true,
            deletedID: req.params.id
        })
    })


module.exports = router
