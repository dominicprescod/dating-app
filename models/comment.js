var mongoose = require('mongoose');
mongoose.set('debug',true);
var Schema = mongoose.Schema;

var commentSchema = new Schema({
      parent: {type: String, required: true},
      from_id: {type: String, required: true},
      from_name: {type: String, required: true},
      from_pic: {type: String},
      value: {type: String, required: true},
      date: {type: Date, default: Date.now}
}, {collection: 'comments'});

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
