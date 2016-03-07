// REQUIREMENTS
var express = require('express');
var router = express.Router();

var Like = require('../models/likes.js');

var newLike = [
  { name: 'Photography'},
  { name: 'Programming'},
  { name: 'Art'},
  { name: 'Cars'},
  { name: 'Crafting'},
  { name: 'Home Decorating'},
  { name: 'Film'},
  { name: 'Music'},
  { name: 'Gaming'},
  { name: 'Tv'},
  { name: 'Venture Capital'},
  { name: 'Innovation'},
  { name: 'Startups'},
  { name: 'Finance'},
  { name: 'Fitness'},
  { name: 'Crossfit'},
  { name: 'Gaming'},
  { name: 'Science'},
];

// SEEDING
router.get('/', function(req, res){
  Like.create(newLike, function(err){
    if (err){
      console.log(err);
      res.send('Error seeding database');
    } else {
      console.log('Seed completed');
      res.redirect('/')
    }
  });
});

// EXPORTING
module.exports = router;
