var express = require('express'),
    models = require('./model'),
    db,
    Comune,
	mongoose = require('mongoose');

var app = express();
app.set('title', 'MiaApplication');

								 
if ('development' == app.get('env')) {
	app.set('db-uri', 'mongodb://localhost/nodefordummies');
	 app.use(express.errorHandler({ dumpExceptions: true }));
  app.set('view options', {
    pretty: true
  });
}

// production only
if ('production' == app.get('env')) {
	app.set('db-uri', 'mongodb://localhost/nodefordummies');
} 

models.defineModels(mongoose,function() {
  app.Comune = Comune = mongoose.model('Comune');
  db = mongoose.connect(app.set('db-uri'));
})

app.get('/', function(req, res){
                  res.send('Hello World');
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
  Comune.find({descrizione: "Castenedolo" } ,
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
				  
				  
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
