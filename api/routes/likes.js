const express = require('express')

const router = express.Router()
function sorter(likes) {
    let likeCount = 0;
    let disLikeCount = 0;
    for (i = 0; i < likes.length; i++) {
        likeCount += likes[i].like
        disLikeCount += likes[i].disLike
    }
    return [likeCount, disLikeCount]
}

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
        let likes = await global.Likes.find({ eventId: id, like: true })
        let dislikes = await global.Likes.find({ eventId: id, dislike: false })
        let myLike = await global.Likes.findOne({ eventId: id, reviewerId: req.user._id })
        // let likeCount, disLikeCount;
        // rating
        // [likeCount, disLikeCount] = sorter(ratings)
        console.log(req.user._id)
        // console.log("like and disLike count " + likeCount + " " + disLikeCount)
        res.json({
            likeCount: likes.length,
            disLikeCount: dislikes.length,
            myLike: myLike
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
