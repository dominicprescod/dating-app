// REQUIREMENTS
var mongoose = require('mongoose');

// SCHEMA
var likeSchema = mongoose.Schema({
  name: String
});

// EXPORT
module.exports = mongoose.model('Like', likeSchema);
