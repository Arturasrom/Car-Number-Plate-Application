//Monggose library.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema.
let Owner = new Schema({
  owner_name: {
    type: String
  },
  license_plate: {
    type: String
  },

}, {
  collection: 'owners'
})

module.exports = mongoose.model('Owner', Owner)