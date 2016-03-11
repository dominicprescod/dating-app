// REQUIREMENTS
var express = require('express');
var router = express.Router();

var Like = require('../models/likes.js');

var newLike = [
  { name: 'PHOTOGRAPHY'},
  { name: 'FASHION'},
  { name: 'ART'},
  { name: 'CARS'},
  { name: 'FILM'},
  { name: 'GAMING'},
  { name: 'SCIENCE'},
  { name: 'MUSIC'},
  { name: 'FINANCE'},
  { name: 'FITNESS'},
  { name: 'WHISKY'},
  { name: 'MEMES'},
  { name: 'TRAVEL'},
  { name: 'WRITING'},
  { name: 'MEDITATION'},
  { name: 'COOKING'},
  { name: 'DANCING'},
  { name: 'CATS'},
  { name: 'READING'},
  { name: 'SPORTS'}
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
