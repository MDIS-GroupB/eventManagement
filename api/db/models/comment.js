const mongoose = require('./init').mongoose

const commentSchema = mongoose.Schema({
  reviewer: String,
  commentDate: String,
  comments: String,
  passedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    // required: true,
  },
})

const comment = mongoose.model('Comment', commentSchema)

module.exports = comment