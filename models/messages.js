var mongoose = require('mongoose');
mongoose.set('debug',true);
var Schema = mongoose.Schema;
var commentSchema = require('./comment.js').schema;


var messageSchema = new Schema({
      name: {type: String, required: true},
      date: {type: Date, default: Date.now},
      comments: [commentSchema],
      fpal:[{
            firstName: String,
            lastName: String,
            rId: String,
            pic: String
          }],
      spal: [{
            firstName: String,
            lastName: String,
            rId: String,
            pic: String
      }]
}, {collection: 'messages'});

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;
