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
var port = process.env.PORT || 3000;
app.get('/eccezione/getAll', function (req, res) {
    console.log("Inizio ricerca...");
    mongoose.model('eccezioneModel').find({},
    function (err, eccezioni) {
        eccezioni = eccezioni.map(function (d) {
            return {
                messaggio: d.messaggio,
                id: d._id,
                mittente: d.mittente
				
            };
        });
        console.log("Fine ricerca");
        //res.send(eccezioni);
		 res.render('eccezione.jade',{
		 "eccezioni":eccezioni,
		 "port":port
		 } );
    });
    console.log("Fine call");

});

app.post('/eccezione', function(req, res){
                concentratore.getEccezione(req.body.messaggio, req.body.mittente);
				res.send("OK");
                });

server.listen(port, function () {
    console.log("Listening on " + port);
});
