// function fill(){
//     var seeder = require('mongoose-seed')
//     var data = [
//         {
//           model: 'User',
//           documents: [{
//               _id: '59749b4c6df3cd4b3b517050',
//               name: 'Signwave Parramatta',
//               logo: ''
//             }
//           ]
//         }]
//     seeder.connect(process.env.MONGO_URL, () => {
//       // Load Mongoose models
//       seeder.loadModels([
//         './models/user.js',
//         './models/personal.js',
//       ])
  
//       seeder.clearModels([
//         'User',
//         'Personal',
//       ], function() {
  
//         // Callback to populate DB once collections have been cleared
//         seeder.populateModels(data, function() {
//             // throw Error('populate Models failed')
//         });
//       })
//     })
//   }
  
//   module.exports = {
//     //Destroy and seed again
//     fill: fill
//   }
  