var express = require('express'),
    models = require('./model'),
    db,
    Comune,
	mongoose = require('mongoose'),
	jade=require('jade');

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



app.get('/', function(req, res){
var x=app.get('env')
                  res.send('Hello World'+x);
				  
                  });
app.post('/insert', function(req, res){
                console.log(req.body);
                var result= req.body.txtProvincia;
                console.log('Risultato: '+result);
				var newComune= new Comune({
				descrizione:req.body.txtDescrizione,
				provincia:req.body.txtProvincia
				})
				newComune.save(function(err) {
				if(err)
					console.log(err);				
				res.send('Comune inserito');
				}); 
            });
app.get('/prova', function(req, res){
                
                if(req.is('text/html')){
                  res.send('<html><head><title>'+app.get('title')+'</title></head>Hello HTML</html>');
                  }
                 if(req.is('json')){
                  res.send('<html><head><title>'+app.get('title')+'</title></head>Hello JSON</html>');
                  }
   
                  });
				  
app.get('/comuni', function(req, res) {
  Comune.find({} ,
  function(err, comuni) {
    comuni = comuni.map(function(d) {
		return { 
		descrizione: d.descrizione, 
		id: d._id,
		provincia: d.provincia	};
		});
    res.send(comuni);
  });
});
app.get('/InsertComune', function(req, res){
	res.render('index.jade', {title: 'Scaliamo di bestia'});
});
				  
				  
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
