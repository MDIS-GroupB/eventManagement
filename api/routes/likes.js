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
        console.log("id is the id " + id)
        let likes = await global.Likes.find({ passedId: id })
        let likeCount = 0;
        let disLikeCount = 0;
        for (i = 0; i < likes.length; i++) {
            likeCount += likes[i].like
            disLikeCount += likes[i].disLike
        }
        console.log("like and disLike count " + likeCount + " " + disLikeCount)
        res.json({
            likeCount: likeCount,
            disLikeCount: disLikeCount
        })
    })

    .post('/doLike/:id', async (req, res) => {
        console.log("wtf?")
        let record = await global.Likes.findOne({ passedId: req.params.id, reviewerId: req.user._id })
        console.log(!!record)
        if (!!record) {
            await global.Likes.update({ passedId: req.params.id, reviewerId: req.user._id }, { $inc: { like: 1 } })
            console.log("updated")
        }
        else {
            let newRecord = await global.Likes.create({
                reviewerId: req.user._id,
                passedId: req.params.id,
                like: 1,
                disLike: 0,
            })
            console.log(newRecord)
        }

        let likes = await global.Likes.find({ passedId: req.params.id })
        let likeCount = 0;
        for (i = 0; i < likes.length; i++) {
            likeCount += likes[i].like
        }
        console.log("like count " + likeCount)
        res.json({
            likeCount: likeCount,
        })

    })

    .post('/disLike/:id', async (req, res) => {
        console.log("wtf?")
        let record = await global.Likes.findOne({ passedId: req.params.id, reviewerId: req.user._id })
        console.log(!!record)
        if (!!record) {
            await global.Likes.update({ passedId: req.params.id, reviewerId: req.user._id }, { $inc: { disLike: 1 } })
            console.log("updated")
        }
        else {
            let newRecord = await global.Likes.create({
                reviewerId: req.user._id,
                passedId: req.params.id,
                like: 0,
                disLike: 1,
            })
            console.log(newRecord)
        }

        let likes = await global.Likes.find({ passedId: req.params.id })
        let disLikeCount = 0;
        for (i = 0; i < likes.length; i++) {
            disLikeCount += likes[i].disLike
        }
        console.log("disLike count " + disLikeCount)
        res.json({
            disLikeCount: disLikeCount
        })
    })

module.exports = router
