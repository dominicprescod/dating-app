// REQUIREMENTS
var express  = require('express'),
    passport = require('passport'),
    router   = express.Router();

// MODELS
var User    = require('../models/users'),
    Like    = require('../models/likes'),
    Board   = require('../models/messages'),
    Comment = require("../models/comment");


// Logged in User
var signedIn = null;


// logging out from current session
router.get('/logout',function(req,res){
      req.logout();
      signedIn = null; //removes signed in user data
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
      signedIn = req.user; //creates logged in user data
      console.log(req.user);
        res.send(req.user);
});

// User create -- signup -- works(dom)
router.post('/register', passport.authenticate('local-signup', {
	failureRedirect: '/users' }), isLoggedIn, function(req, res) {
    signedIn = req.user; //creates logged in user data
    //success sends json
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

// New Comment
// ====================================================
router.post('/:id/comment',function(req,res){
  // creates a new comment using the schema
    var newComment = new Comment(req.body);
    // finds the current board using the information captured the form
    Board.findById(newComment.parent,function(err,board){
      // pushing to the comments element in the object and saving
      board.comments.push(newComment);
      board.save(function(nErr,nBoard){
        res.send(nBoard);
      });

    });
});
// ====================================================

// Get inbox messages or message or create inbox message
// ======================================================================================================================
router.get('/:id/board', isLoggedIn, function(req, res) {
  // for user control flow within template (enables editing only on the user's own page)
  // finding users by the id passed in the webpage
  User.findById(req.params.id,function(err, user){
    // if the page viewed is not the person logged in find or create an inbox message board
    if(req.params.id != signedIn._id){
      // finds the board that has a name of both the users combined
        Board.findOne({$or:[{name: signedIn._id+'-'+req.params.id},{name: req.params.id+'-'+signedIn._id}]}, function(err, board){
          if(board){//if the inbox message between two users exist it renders the page with the inbox information
            res.send(board);
          } else { //if the inbox messages does not exist it creates a new inbox message board between the users and renders the page
            var newInboxMessage = new Board({name:signedIn._id+'-'+req.params.id});
            newInboxMessage.fpal.push({
              firstName: user.firstName,
              lastName: user.lastName,
              rId: user.id,
              pic: user.pic
            });
            newInboxMessage.spal.push({
              firstName:signedIn.firstName,
              lastName: signedIn.lastName,
              rId: signedIn._id,
              pic: signedIn.pic
            });
            newInboxMessage.save(function(err, board){
              res.send(board);
            });
          }
        });
    } else {
      // when the current user is viewing their profile page, render their inbox with all the between them and another user
      // the inbox message is simply a board thats named with a combination of both user's ids with a - between them
      // this query checks all boards for the current user's in as part of the name string
      Board.find({name: {"$regex": req.params.id, "$options": "i"}},function(err,docs){
        // console.log(docs);
        // rendering with that specific user's data
        res.send(docs);
      });

    }
      });
});
// ======================================================================================================================








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
