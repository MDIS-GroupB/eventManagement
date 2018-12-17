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
        let events = await global.Event.find().populate('venueId').populate('eventProposer') //get associated venue and proposer info
        const rowLen = events.length;

        for (var i = 0; i < rowLen; i++) {

            let hosterId = events[i].eventProposer
            let hoster = await global.Personal.findOne({ userID: hosterId })
            response.push({
                eventData: events[i],
                proposer: hoster
            })
        }

        //dont' use .map or foreach in async function call, it dosen't goes by sequence
        // await only can wait a function call or a promise

        console.log("after the response")
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

    .post('/like/:id', async (req, res) => {
        console.log("you comed to comment backend api")
        console.log(req.params.id)

        await global.Event.updateOne({ _id: Object(req.params.id) }, { $inc: { like: + 1 } });
        let updatedEvent = await global.Event.findOne({ _id: Object(req.params.id) })

        console.log("event liked " + updatedEvent)
        res.json({
            like: updatedEvent.like
        })
    })

    .post('/disLike/:id', async (req, res) => {
        console.log("you comed to comment backend api")
        console.log(req.params.id)

        await global.Event.update({ _id: Object(req.params.id) }, { $inc: { disLike: + 1 } });
        let updatedEvent = await global.Event.findOne({ _id: Object(req.params.id) })

        console.log("event disLiked " + updatedEvent)
        res.json({
            disLike: updatedEvent.disLike
        })
    })

module.exports = router
