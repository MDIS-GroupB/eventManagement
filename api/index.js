const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

//Init
require('./db/dbInit')

//Routes
const paymentRouter = require('./routes/payment')
const chargeRouter = require('./routes/charge')
const authRouter = require('./routes/auth')
const eventRouter = require('./routes/event')
const personalRouter = require('./routes/personal')
const venueRouter = require('./routes/venue')
const personalEventRouter = require('./routes/personalEvent')
const testRouter = require('./routes/test')
const adminRouter = require('./routes/admin')

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

//stripe payment api
const keys = require('./config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const exphbs = require('express-handlebars');

//Handlebars Middleware
server.engine('handlebars', exphbs({ defaultLayout: 'main' }));
server.set('view engine', 'handlebars');

//render payment model
server.get('/', (req, res) => {
  res.render('index', {
    stripePublishableKey: keys.stripePushliableKey
  });
})

//server side payment router
server.use('/payment',
  paymentRouter,
)

// server side payment success router
server.use('/charge',
  chargeRouter,
)

//server side routers
server.use('/auth',
  authRouter,
)
server.use('/test',
  testRouter,
)
server.use('/event',
  eventRouter,
)
server.use('/venue',
  venueRouter,
)
server.use('/personalEvent',
  authMiddleware.authenticateJWT,
  personalEventRouter,
)
server.use('/personal', (req, res, next) => {
  console.log(req.headers)
  next()
},
  authMiddleware.authenticateJWT,
  personalRouter,
)

server.use('/admin',
  authMiddleware.authenticateJWT,
  authMiddleware.checkAdmin,
  adminRouter,
)


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