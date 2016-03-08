// REQUIREMENTS
var express  = require('express'),
    passport = require('passport'),
    router   = express.Router();

// MODELS
var User    = require('../models/users'),
    Like    = require('../models/likes'),
    Message = require('../models/messages');



// logging out from current session
router.get('/logout',function(req,res){
      // console.log("user has been logged out");
      // console.log(req.user);
      req.logout();
      res.redirect('/');
});

// INDEX
router.get('/', function(req, res) {
	User.find(function(err, users) {
		res.send(users);
	});
});

// GETTING LIKES CATEGORIES
router.get('/likes', function(req, res){
  Like.find(function(err, data) {
    // console.log(req.user)
    res.send(data);
	});
});

// POST
router.put('/:id', function(req, res){
  console.log(req.user.likes)
  User.findById(req.params.id, req.body, function(err, user){
    res.send(req.user)
  })
})

// // GETTING users JSON data from the database
// router.get('/',function(req,res){
//   User.find(function(err,data){
//       res.send(data);
//   });
// });

// Login testing
router.post('/login',passport.authenticate('local-login',{
    failureRedirect: '/',}), isLoggedIn, function(req,res){
        res.send(req.user);
  });


  // user create -- signup -- works(dom)
  router.post('/register', passport.authenticate('local-signup', {
  	failureRedirect: '/users' }), isLoggedIn, function(req, res) {
      //success redirect goes to show page
      res.send(req.user);
  });


// user SHow data
router.get('/:id/json', isLoggedIn, function(req,res){
    User.findById(req.params.id,function(err,data){
      res.send(data);
    });
});

// ==================================================
 // trying to add a hash to the users passwords
 // - WORKED all user password from seed data are now hashed
 // uncomment to hash new seed data
 // ==================================================
// router.get('/hash',function(req,res){
//   User.find(function(err,data){
//       data.forEach(function(i){
//         i.password = i.generateHash(i.password);
//         i.save(function(){});
//       });
//   });
// });
// ==================================================

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
      console.log("logged in");
      return next();
    } else{
    console.log('not logged in');
    // if they aren't redirect them to the home page
    res.redirect('/');
    }
}


// EXPORT
module.exports = router;
