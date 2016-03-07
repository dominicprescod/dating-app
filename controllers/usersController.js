// REQUIREMENTS
var express  = require('express'),
    passport = require('passport'),
    router   = express.Router();

// MODELS
var User    = require('../models/users'),
    Like    = require('../models/likes'),
    Message = require('../models/messages');

// INDEX
router.get('/', function(req, res) {
	res.locals.login = req.isAuthenticated();
	User.find(function(err, users) {
		res.send(users);
	});
});

// GETTING LIKES CATEGORIES
router.get('/likes', function(req, res){
  Like.find(function(err, data) {
    // console.log(data)
    res.send(data);
	});
});

// GETTING users JSON data from the database
router.get('/',function(req,res){
  User.find(function(err,data){
      res.send(data);
  });
});


// EXPORT
module.exports = router;
