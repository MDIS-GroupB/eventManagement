const express = require('express')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router
    .post('/', async (req, res) => {
        console.log("you comed to comment backend api")
        console.log(req.body)
        console.log(req.user._id)

        var reviewer = await global.Personal.findOne({ userID: req.user._id })

        console.log(reviewer.firstName)

        let newComment = await global.Comment.create({
            reviewer: reviewer.firstName + " " + reviewer.lastName,
            commentDate: req.body.commentDate,
            comments: req.body.comments,
            eventId: req.body.eventId
        })
        console.log(newComment)
        console.log("inserted!")
        // console.log(newComment)
    })

    .get('/:id', async (req, res) => {
        var id = req.params.id;
        let comments = await global.Comment.find({ eventId: id })
        console.log("selected comment")
        console.log(comments)
        res.json({
            comments: comments,
        })
    })

    .get('/', async (req, res) => {
        res.json({
            works: true,
            products: "geet your shit working",
        })
    })


module.exports = router