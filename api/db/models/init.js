const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const mongoUri = 'mongodb+srv://daboss:asdfasdf@cluster0-ce1qv.mongodb.net/test?retryWrites=true'
// const mongoUri = 'mongodb://localhost:27017/eventhandling'

mongoose.Promise = Promise
mongoose.connect(mongoUri, { useNewUrlParser: true });
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
