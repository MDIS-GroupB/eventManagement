const mongoose = require('./init').mongoose

const likesSchema = mongoose.Schema({
    reviewer: String,
    passedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        // required: true,
    },
    like: Boolean,
    dislike: Boolean
})

const likes = mongoose.model('Likes', likesSchema)

module.exports = likes