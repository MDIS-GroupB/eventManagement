const express = require('express')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')
const { Console } = require('console');

const router = express.Router()

router
    // .route('/')
    //get all
    .get('/allWithHoster', async (req, res) => {
        var response = []
        let events = await global.Event.find().populate('venueId')
        events.map(async (event) => {
            let hosterId = event.eventProposer
            console.log("hosterId")
            console.log(hosterId)
            console.log(response)
            let hoster = await global.Personal.findOne({ userID: hosterId })
            response.push({
                eventData: event,
                properser: hoster
            })
        })
        res.json(response)
    })

    .get('/all', async (req, res) => {
        let events = await global.Event.find().populate('venueId')
        res.json(events)
    })

    // Get logged in user’s details
    .get('/', async (req, res) => {
        let events = await global.Event.find({ eventProposer: req.user._id })
        res.json(events)
    })
    // router
    // .route('/:id')

    .get('/:id', async (req, res) => {
        var id = req.params.id;
        let theEvent = await global.Event.findOne({ _id: Object(id) })
            .populate('venueId') //.populate() basically select stuff from other table where otherTableId==thisId
        // res.json({
        //   works:true,
        //   products:theProduct,
        // })
        let proposer = await global.Personal.findOne({ userID: theEvent.eventProposer })
        res.json({
            eventData: theEvent,
            properser: proposer
        })
    })



module.exports = router
