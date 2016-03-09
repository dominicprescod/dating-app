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
    // console.log(data)
    res.send(data);
	});
});


// POST - PUT
router.put('/:id', function(req, res){
  // console.log(req.user.likes)
  console.log(req.body+" this is the like object");
  User.findById(req.params.id, function(err, user){
    user.likes.push(req.body);
    user.save(function(err,userWithLikes){
      res.send(userWithLikes);
    });
    // res.send(req.user);
  });
});
// =======
// Merge Conflict - Tuesday Mar 8th 11:03am changing router put/post for likes
// router.post('/:id', function(req, res){
//   User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//     res.send(req.body)
//   })
// })
//44ea38e2f5aeae5a8607b8287279d02b502b0f25

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

// getting user likesArray
router.post('/:id', function(req, res){
  console.log(req.body)
  console.log('======================================')
  User.findById(req.params.id, function(err, data){
    console.log(data);
    data.likes.forEach(function(i){
      if(i.name === req.body.name){
        console.log(i);
        var num = data.likes.indexOf(i);
        console.log(num);
        data.likes.splice(num,1);
      }
    });
  //   for(var i = 0; i < data.likes.length; i++){
  //
  // }
  data.save(function(){});
    })
})


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
