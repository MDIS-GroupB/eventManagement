const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

//Init
require('./db/dbInit')

//Routes
const authRouter = require('./routes/auth')
const eventRouter = require('./routes/event')
const personalRouter = require('./routes/personal')
const testRouter = require('./routes/test')

// Create server
const server = express();
const authMiddleware = require('./middleware/auth')
server.use(helmet());
server.use(compression()); //Compress all routes
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }));
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.use(cors());

//Dereks first route
server.get('/mdistesting', (request, response) => {
  response.send('Works')
})



server.use('/dbDrop', (res, req) => {
  global.User.remove({}, function (err) {
    console.log('collection removed')
  })
  global.Venue.remove({}, function (err) {
    console.log('collection removed')
  })
  global.Event.remove({}, function (err) {
    console.log('collection removed')
  })
  global.Personal.remove({}, function (err) {
    console.log('collection removed')
  })
  res.json({ hm: 'bwah' })
})
server.use('/auth', authRouter)
server.use('/test', testRouter)
server.use('/event', eventRouter)
server.use('/personal', authMiddleware.authenticateJWT, personalRouter)

// Handle errors by returning JSON
server.use((error, req, res, next) => {
  const status = error.status || 500
  res.status(status).json({
    error: { message: `Error:\n${error.message}` }
  })
})

// Start server at localhost:7000
const port = 8085
server.listen(port, () => {
  console.log(`Started at localhost:${port}`)
})

  // For deploy to heroku
  // server.listen(process.env.PORT || 5000)