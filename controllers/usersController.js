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
      req.logout();
      res.redirect('/');
});

// INDEX
router.get('/', function(req, res) {
	User.find(function(err, users) {
		res.send(users);
	});
});

 // Finding according to similar LIKES
 router.post("/:id/bylikes",function(req,res){
   var cat = [];
   //stores likes "strings" of the current user to check the database for users that like the same as current user
   for(var i = 0; i < req.body.length; i++){
     cat.push(req.body[i].name);
   }
  //  searches the database for users that like the same likes as the current user
   User.find({ likes: { '$elemMatch': { name: {$in:cat }} } },function(err,data){
        res.send(data);
   });
 });

// GETTING LIKES CATEGORIES
router.get('/likes', function(req, res){
  Like.find(function(err, data) {
    // console.log(data)
    res.send(data);
	});
});

// POST - PUT
router.put('/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
    // setting a variable of false to test if user already has the like element already - false it does not - true it does
    var hasLike = false;
    // looping through the current user's likes
    user.likes.forEach(function(i){
      // if user like matches the one sent via req.body set hasLike to true
      if(i.name === req.body.name) hasLike = true;
    });
    // if hasLike is true send the current user unchanged if false add the like and send the updated user
    if(hasLike){
      res.send(user);
    } else {
      // pushes new like to users likes array and saves the updated user
      user.likes.push(req.body);
      user.save(function(err,userWithLikes){
      res.send(userWithLikes); //sends the updated json data
      });
    }
  });
});

// Login testing
router.post('/login',passport.authenticate('local-login',{
    failureRedirect: '/',}), isLoggedIn, function(req,res){
        res.send(req.user);
});

// User create -- signup -- works(dom)
router.post('/register', passport.authenticate('local-signup', {
	failureRedirect: '/users' }), isLoggedIn, function(req, res) {
    //success redirect goes to show page
    res.send(req.user);
});

// User show data
router.get('/:id/json', isLoggedIn, function(req,res){
    User.findById(req.params.id,function(err,data){
      res.send(data);
    });
});

// Removing likes from the user
router.post('/:id', function(req, res){
  User.findById(req.params.id, function(err, data){
    data.likes.forEach(function(i){
      // if the user has a like similar to the data sent
      if(i.name === req.body.name){
        // logs the index of the like
        var num = data.likes.indexOf(i);
        // removes from users likes
        data.likes.splice(num,1);
      }
    });
    // saves the changes and sends the updated user's data
    data.save(function(err, sdata){
    res.send(sdata);
    });
  });
});

// ==================================================
// trying to add a hash to the users passwords
// - WORKED all user password from seed data are now hashed
// uncomment to hash new seed data
// =================================================

// adding likes to the users database
router.get("/autolikes",function(req,res){
  User.find(function(err,users){
    Like.find(function(err,likes){
      users.forEach(function(i){
        var num = Math.floor(Math.random()*18);
        for(var k = 0; k < num; k++){
          i.likes.push(likes[k]);
        }
        i.save(function(){});
      });
    });
    res.send(users);
  });
});

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
    } else {
    console.log('not logged in');
    // if they aren't redirect them to the home page
    res.redirect('/');
    }
}

// EXPORT
module.exports = router;
