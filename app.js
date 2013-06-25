var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
  res.status(200).sendfile('index.html');
});

app.listen(778);

console.log('Running server at 127.0.0.1:778');