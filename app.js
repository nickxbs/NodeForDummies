var express = require('express'),
http = require('http'),    
    models = require('./model'),
    db,
    Comune,
mongoose = require('mongoose');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

if ('development' == app.get('env')) {
    app.set('db-uri', 'mongodb://localhost/nodefordummies');
    app.use(express.errorHandler({ dumpExceptions: true }));
    app.set('view options', {
        pretty: true
    });
}

// production only
if ('production' == app.get('env')) {
    app.set('db-uri', 'mongodb://heroku:studiofarma@alex.mongohq.com:10017/app7875330');
}

var db = mongoose.connect(app.set('db-uri'));
var concentratore = require('./Concentratore').concentratore(io, mongoose);

app.set('title', 'MiaApplication');
app.set('views', __dirname + '/views');
app.use('public', express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.get('/eccezione', function (req, res) {
  res.render('index.jade' );
});

app.post('/eccezione', function(req, res){
                concentratore.getEccezione(req.body.messaggio, req.body.mittente);
                });
var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log("Listening on " + port);
});
