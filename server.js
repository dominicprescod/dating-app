// REQUIREMENTS
var express           = require('express'),
    bodyParser        = require('body-parser'),
    methodOverride    = require('method-override'),
    mongoose          = require('mongoose'),
    passport          = require('passport'),
    session           = require('express-session'),
    app               = express(),
    port              = process.env.PORT || 3000;


require('./config/passport')(passport);

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/dating_app';
mongoose.connect(mongoUri);

// MIDDELWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ name: 'dating_app', secret: 'dating' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

var usersController = require('./controllers/usersController');
app.use('/users', usersController);

// creating likes Seed Data
var likesSeedController = require('./controllers/likesSeedController');
app.use('/likesseed', likesSeedController);

// Creating user Seed data
var userSeedController = require('./controllers/userSeedController');
app.use('/userseed', userSeedController);


// makes a variable login available in your templates.
app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});


// CONNECT & LISTEN
mongoose.connection.once('open', function() {
  app.listen(port, function() {
      console.log('LISTEN TO ME ON PORT ' + port);
  });
});
