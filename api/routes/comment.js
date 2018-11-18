const express = require('express')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router
    .post('/', async (req, res) => {
        console.log("you comed to comment backend api")
        console.log(req.body)
        console.log(req.user._id)

        var firstName = await global.Personal.findOne({ _id: req.user._id }).firstName
        var lastName = await global.Personal.findOne({ _id: req.user._id }).lastName

        let newComment = await global.Comment.create({
            reviewer: firstName + lastName,
            commentDate: req.body.commentDate,
            comments: req.body.comments,
            eventId: req.body.eventId
        })
        console.log("inserted!")
        // console.log(newComment)
    })
    .get('/', async (req, res) => {
        res.json({
            works: true,
            products: "geet your shit working",
        })
    })


module.exports = router