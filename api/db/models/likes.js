const mongoose = require('./init').mongoose

const likesSchema = mongoose.Schema({
    reviewerId: String,
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
    },
    like: Boolean,
})

const likes = mongoose.model('Likes', likesSchema)

module.exports = likes