// REQUIREMENTS
var express           = require('express'),
    bodyParser        = require('body-parser'),
    methodOverride    = require('method-override'),
    mongoose          = require('mongoose'),
    passport          = require('passport'),
    session           = require('express-session'),
    app               = express(),
    port              = process.env.PORT || 3000;


// require('./config/passport')(passport);

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/dating_app';
mongoose.connect(mongoUri);

// MIDDELWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ name: 'dating_app', secret: 'dating' }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(methodOverride('_method'));

var usersController = require('./controllers/usersController');
app.use('/users', usersController);

var likesSeedController = require('./controllers/likesSeedController');
app.use('/likesseed', likesSeedController);

// CONNECT & LISTEN
mongoose.connection.once('open', function() {
  app.listen(port, function() {
      console.log('LISTEN TO ME ON PORT ' + port);
  });
});
