const mongoose = require('./init').mongoose

const personalSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: String,
  lastName: String,
})

const personal = mongoose.model('Personal', personalSchema)

module.exports = personal
