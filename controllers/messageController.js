var signedIn = null;
signedIn = signedIn;
signedIn = null;
// will be defined in login / register
// will be set clear at logout


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
    if(req.params.id !== signedIn.id){
      // finds the board that has a name of both the users combined
        Board.findOne({$or:[{name: signedIn.id+'-'+req.params.id},{name: req.params.id+'-'+signedIn.id}]}, function(err, board){
          if(board){//if the inbox message between two users exist it renders the page with the inbox information
            res.send(board);
          } else { //if the inbox messages does not exist it creates a new inbox message board between the users and renders the page
            var newInboxMessage = new Board({name:signedIn.id+'-'+req.params.id});
            newInboxMessage.fpal.push({
              firstName: user.firstName,
              lastName: user.lastName,
              rId: user.id,
              pic: user.pic
            });
            newInboxMessage.spal.push({
              firstName:signedIn.firstName,
              lastName: signedIn.lastName,
              rId: signedIn.id,
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
