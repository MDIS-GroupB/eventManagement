const express = require('express')

const router = express.Router()

router
    .get('/', async (req, res) => {
        res.json({
            works: true,
            products: "geet your shit working",
        })
    })

    .get('/:id', async (req, res) => {
        var id = req.params.id;
        let likes = await global.Likes.find({ eventId: id, like: true })
        let dislikes = await global.Likes.find({ eventId: id, like: false })
        let myLike = await global.Likes.findOne({ eventId: id, reviewerId: req.user._id })
        // let likeCount, disLikeCount;
        // rating
        // [likeCount, disLikeCount] = sorter(ratings)
        // console.log("like and disLike count " + likeCount + " " + disLikeCount)
        res.json({
            likeCount: likes.length,
            disLikeCount: dislikes.length,
            myLike: myLike
        })
    })

    .post('/doLike/:id', async (req, res) => {
        let record = await global.Likes.findOne({ eventId: req.params.id, reviewerId: req.user._id })
        if (!!record) {
            if (record.like == true) {
                record.remove()
            } else {
                record.like = true
                await record.save()
            }
        }
        else {
            await global.Likes.create({
                reviewerId: req.user._id,
                eventId: req.params.id,
                like: true,
            })
        }
        res.status(200).json({});
    })

    .post('/disLike/:id', async (req, res) => {
        let record = await global.Likes.findOne({ eventId: req.params.id, reviewerId: req.user._id })
        if (!!record) {
            if (record.like == false) {
                record.remove()
            } else {
                record.like = false
                await record.save()
            }
        }
        else {
            await global.Likes.create({
                reviewerId: req.user._id,
                eventId: req.params.id,
                like: false,
            })
        }
        res.status(200).json({});
    })

module.exports = router
