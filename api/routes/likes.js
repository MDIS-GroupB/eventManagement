const express = require('express')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')
const { Console } = require('console');

const router = express.Router()

router
    .get('/', async (req, res) => {
        console.log("triggered")
        res.json({
            works: true,
            products: "geet your shit working",
        })
    })

    .get('/:id', async (req, res) => {
        var id = req.params.id;
        let likes = await global.Likes.find({ passedId: id })
        console.log("selected likes")
        console.log(comments)
        res.json({
            comments: comments,
        })
    })

    .post('/doLike/:id', async (req, res) => {
        console.log("wtf?")
        let records = await global.Likes.findOne({ passedId: req.param.id })
        console.log(records)
        if (!records) {
            let record = await records.findOne({ reviewerId: req.user._id })
            if (!record) {
                record.update({ $set: { like: 1, disLike: 0 } })
            }
        }
        else {
            let newRecord = await global.Likes.create({
                reviewerId: req.user._id,
                passedId: req.body.passedId,
                like: 1,
                disLike: 0,
            })
            console.log(reRecords)
        }

        // console.log("you comed to comment backend api")
        // console.log(req.params.id)

        // await global.Likes.updateOne({ _id: Object(req.params.id) }, { $set: { like: 1, disLike: 0 } });
        // let updatedLikes = await global.Event.findOne({ _id: Object(req.params.id) })

        // console.log("do liked " + updatedLikes)
        // res.json({
        //     likes: updatedLikes
        // })
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
