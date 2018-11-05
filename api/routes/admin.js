const express = require('express')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router
    .route('/event')
    // Get logged in user’s details
    .get(async (req, res) => {
        let events = await global.Event.find().populate('venueId');

        res.json(events)
    })

router
    .route('/event/:id')
    .patch(async (req, res) => {
        console.log("you have comed to backend" + req.params)
        const EventId = req.params.id;
        const AdminId = req.user._id;
        const Status = req.body.status
        //console.log(req.body)
        //console.log("my a is " + req.body.a)
        //console.log("console the 3 params first !!!" + eventId, adminId, status)
        console.log("Status")
        console.log(Status)

        console.log("req.params")
        console.log(req.params)

        let updateStatus = {
            approved: Status,
            userId: AdminId
        }

        let theEvent = await global.Event.findById(EventId)
        theEvent.status = updateStatus
        let updatedEvent = await theEvent.save()
        res.json(updatedEvent)
    })

module.exports = router
