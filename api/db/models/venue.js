const mongoose = require('./init').mongoose

const venueSchema = mongoose.Schema({
  name: String,
  theme: Array,
  // hostingID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  description: String,
  location: String,
  image: String,
  // venueId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Venue',
  //     required: true,
  //   },
})

const Venue = mongoose.model('Venue', venueSchema)

module.exports = Venue
