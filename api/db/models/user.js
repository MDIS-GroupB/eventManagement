const mongoose = require('./init').mongoose
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = mongoose.Schema({
  admin: {
    default: true,
    type: String,
  }
})
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  session: false
})

const User = mongoose.model('User', userSchema)

module.exports = User
