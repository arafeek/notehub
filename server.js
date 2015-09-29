// Server used for heroku environment

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

var port = process.env.PORT || 80;

app.listen(port, function() {
  console.log('Magic happens on port: ' + port);
});