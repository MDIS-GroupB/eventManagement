const mongoose = require('./init').mongoose

const likesSchema = mongoose.Schema({
    reviewerId: String,
    passedId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
    },
    like: Number,
    disLike: Number
})

const likes = mongoose.model('Likes', likesSchema)

module.exports = likes