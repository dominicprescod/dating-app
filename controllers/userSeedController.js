// REQUIREMENTS
var express = require('express');
var router = express.Router();
var User = require('../models/users.js');

var newUser = [];

// SEEDING
router.get('/', function(req, res){
  User.create(newUser, function(err){
    if (err){
      console.log(err);
      res.send('Error seeding database');
    } else {
      console.log('Seed completed');
      res.redirect('/');
    }
  });
});

// EXPORTING
module.exports = router;
