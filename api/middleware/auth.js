const mongoose = require('mongoose')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const User = global.User

const jwtSecret = 'SECRET!'
const jwtAlgorithm = 'HS256'

function signTokenHandler(req, res) {
  const user = req.user
  const token = jwt.sign(
    { // The payload: any additional information we want signed
      email: user.email
    },
    jwtSecret, // The secret used to sign with
    {
      algorithm: jwtAlgorithm,
      subject: user._id.toString(), // The ID of our user
      expiresIn: '10h' // Expires in 10 hours
    }
  )
  res.json({ token })
}

// Logging in with username/password
passport.use(
  User.createStrategy()
)

// JWT
passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: jwtSecret,
      algorithms: [jwtAlgorithm],
      jwtFromRequest: passportJWT.ExtractJwt.fromHeader('authorization')
    },
    (jwtPayload, done) => {
      const userID = jwtPayload.sub
      User.findById(userID)
        .then(user => {
          if (user) {
            done(null, user)
          }
          else {
            done(null, false)
          }
        })
        .catch(error => {
          done(new Error(`User not found with ID: ${userID}`), false)
        })
    }
  )
)

function registerMiddleware(req, res, next) {
  console.log(req.body)
  const user = new User({ email: req.body.email})
  User.register(user, req.body.password, async (error) => {
    if (error) {
      console.error(error)
      next(error)
      return
    }
    req.user = user
    let bat = await global.Personal.create({
      userID: user._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    })

    next()
  })
}

function dropCollection(req, res, next) {
  User.remove({}, function (err) {
    if (err) {
      res.send('Couldnt remove collection')
    } else {
      res.send('collection removed')
    }
  });
}

module.exports = {
  dropCollection,
  signTokenHandler,
  authenticateSignIn: passport.authenticate('local', { session: false }),
  authenticateJWT: passport.authenticate('jwt', { session: false }),
  initialize: passport.initialize(),
  register: registerMiddleware
}
