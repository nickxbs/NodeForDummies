var express = require('express'),
    models = require('./model'),
    db,
    Comune,
	mongoose = require('mongoose');

var app = express();
app.set('title', 'MiaApplication');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/../public'));
app.use(express.bodyParser());

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

//Initialize models
models.defineModels(mongoose, function () {
    app.Comune = Comune = mongoose.model('Comune');
    app.Asl = Asl = mongoose.model('Asl');
    db = mongoose.connect(app.set('db-uri'));
})

//Hello World 
app.get('/', function (req, res) {
    res.send('Hello World in' + app.get('env'));
});
app.get('/prova', function (req, res) {
    if (req.is('text/html')) {
        res.send('<html><head><title>' + app.get('title') + '</title></head>Hello HTML</html>');
    }
    if (req.is('json')) {
        res.send('<html><head><title>' + app.get('title') + '</title></head>Hello JSON</html>');
    }
});

app.get('/comuni/add', function (req, res) {
    res.render('index.jade', { title: 'Scaliamo di bestia' });
});
app.post('/comuni/add', function (req, res) {
    var newComune = new Comune({
        descrizione: req.body.txtDescrizione,
        provincia: req.body.txtProvincia
    })
    newComune.save(function (err) {
        if (err)
            console.log(err);
        res.send('Comune inserito');
    });
});
app.get('/comuni/add/:descrizione/:provincia', function (req, res) {
    
    var newComune = new Comune({
        descrizione: req.params.descrizione,
        provincia: req.params.provincia,
        asl: [ new Asl({descrizione: 'Asl di Brescia'})]
                    
    })
    newComune.save(function (err) {
        if (err)
            console.log(err);
        res.send('Comune inserito');
    });
});



app.get('/comuni/:descrizione', function (req, res) {
    Comune.find({ descrizione: { $regex: '\w*'+req.params.descrizione+'\w*', $options: 'i' } },
    function (err, comuni) {
        comuni = comuni.map(function (d) {
            return {
                descrizione: d.descrizione,
                id: d._id,
                provincia: d.provincia
            };
        });
        res.send(comuni);
    });
});



var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Listening on " + port);
});
