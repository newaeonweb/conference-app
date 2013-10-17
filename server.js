var express = require('express'),
    path = require('path'),
    http = require('http'),
    speaker = require('./routes/speakers');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/speakers', speaker.findAll);
app.get('/speakers/:id', speaker.findById);
app.post('/speakers', speaker.addSpeaker);
app.put('/speakers/:id', speaker.updateSpeaker);
app.delete('/speakers/:id', speaker.deleteSpeaker);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
