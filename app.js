var express = require('express');
var app = express();
//var app = express.createServer(express.logger());
app.set('title', 'MiaApplication');
// development only
//if ('development' == app.get('env')) {
//  app.set('db uri', 'localhost/dev');
//}
//
//// production only
//if ('production' == app.get('env')) {
//  app.set('db uri', 'n.n.n.n/prod');
//}                                  });


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

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
