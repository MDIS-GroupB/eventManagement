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
    .route('/booking')
    // Get logged in user’s details
    .get(async (req, res) => {
        let bookings = await global.Booking.find().populate('eventId').populate('seller');

        res.json(bookings)
    })

router
    .route('/event/:id')
    .patch(async (req, res) => {
        const EventId = req.params.id;
        const AdminId = req.user._id;
        const Status = req.body.status
        //console.log(req.body)
        //console.log("my a is " + req.body.a)
        //console.log("console the 3 params first !!!" + eventId, adminId, status)

        let updateStatus = {
            approved: Status,
            userId: AdminId
        }

        let theEvent = await global.Event.findById(EventId)
        theEvent.status = updateStatus
        let updatedEvent = await theEvent.save()
        res.json(updatedEvent)
    })
router
    .route('/booking/:id')
    .patch(async (req, res) => {
        let theBooking = await global.Booking.findById(req.params.id)
        theBooking.payedOut = true
        let updatedBooking = await theBooking.save()
        console.log(updatedBooking)
        res.json(updatedBooking)
    })

module.exports = router
