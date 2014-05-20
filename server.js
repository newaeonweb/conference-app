// server.js (Express 4.0)
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT

app.listen(8080);
console.log('Magic happens on port 8080'); 			// shoutout to the user

var speaker = require('./routes/speakers');

app.get('/speakers', speaker.findAll);
app.get('/speakers/:id', speaker.findById);
app.post('/speakers', speaker.addSpeaker);
app.put('/speakers/:id', speaker.updateSpeaker);
app.delete('/speakers/:id', speaker.deleteSpeaker);


//app.route('/speakers')
//
//    .get(function(req, res, next) {
//        // do stuff
//        speaker.findAll();
//    })
//    .post(function(req, res, next) {
//        // do stuff
//    });
//
//
//
//// call the Router
//var dogs = express.Router();
//
//dogs.get('/', function(req, res, next) {
//    // doing more stuff
//});
//
//dogs.post('/', function(req, res, next) {
//    // stuff stuff stuff
//});
//
//// call our router we just created
//app.use('/dogs', dogs);
//





// Old format


//var express = require('express'),
//    path = require('path'),
//    http = require('http'),
//    speaker = require('./routes/speakers');
//
//var app = express();
//
//app.configure(function () {
//    app.set('port', process.env.PORT || 3000);
//    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
//    app.use(express.bodyParser()),
//    app.use(express.static(path.join(__dirname, 'public')));
//});
//
//app.get('/speakers', speaker.findAll);
//app.get('/speakers/:id', speaker.findById);
//app.post('/speakers', speaker.addSpeaker);
//app.put('/speakers/:id', speaker.updateSpeaker);
//app.delete('/speakers/:id', speaker.deleteSpeaker);
//
//http.createServer(app).listen(app.get('port'), function () {
//    console.log("Express server listening on port " + app.get('port'));
//});
