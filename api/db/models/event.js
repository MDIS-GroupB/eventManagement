const mongoose = require('./init').mongoose

const approvedSchema = mongoose.Schema({
  approved: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const eventSchema = mongoose.Schema({
  // employeeId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Employee',
  //   required: true,
  // }
  name: String,
  description: String,
  noOfTickets: Number,
  price: Number,
  dateAndTime: String,
  like: { type: Number, default: 0 },
  disLike: { type: Number, default: 0 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    // required: true,
  },
  venueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    required: true,
  },
  eventProposer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: approvedSchema,
})



const event = mongoose.model('Event', eventSchema)

module.exports = event
