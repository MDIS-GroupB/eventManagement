const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const mongoUri = 'mongodb://localhost/eventhandling'

mongoose.Promise = Promise
mongoose.connect(mongoUri,{ useNewUrlParser: true });
let gfs;

const conn = mongoose.connection
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads')
})

module.exports = {
  mongoose,
  gfs,
  mongoUri
}
