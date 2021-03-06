const mongoose = require('./init').mongoose

const bookingSchema = mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: Number,
  payedOut: {
    type: Boolean,
    default: false
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  created_at: { type: Date, required: true, default: Date.now },
  stripeRef: String,
})

const Booking = mongoose.model('booking', bookingSchema)

module.exports = Booking
