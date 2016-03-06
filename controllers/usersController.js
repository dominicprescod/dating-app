// REQUIREMENTS
var express  = require('express'),
    passport = require('passport'),
    router   = express.Router();

// MODELS
var User    = require('../models/users'),
    Like    = require('../models/likes'),
    Message = require('../models/messages');

// INDEX
router.get('/', redirectUser, function(req, res) {
	res.locals.login = req.isAuthenticated();
	User.find(function(err, users) {
		res.send(users);
	});
});


// EXPORT
module.exports = router;
