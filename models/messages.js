var mongoose = require('mongoose');
mongoose.set('debug',true);
var Schema = mongoose.Schema;


var messageSchema = new Schema({
      name: {type: String, required: true},
      date: {type: Date, default: Date.now},
      comments: [{
                  parent: {type: String, required: true},
                  from_id: {type: String, required: true},
                  from_name: {type: String, required: true},
                  from_pic: {type: String},
                  value: {type: String, required: true},
                  date: {type: Date, default: Date.now}
                }],
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
