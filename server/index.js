'use strict';

var path = require('path');
var qs = require('querystring');
var async = require('async');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var colors = require('colors');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment');
var mongoose = require('mongoose');
var request = require('request');

var DB = process.env.DB;
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var GOOGLE_SECRET = process.env.GOOGLE_SECRET;

mongoose.connect(DB);
mongoose.connection.on('error', function(err) {
  console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});


// Setup
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}

// Assign routes
var authRoutes = require('./routes/auth')(app, express);
app.use('/auth', authRoutes);

// Serve the static assets
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '../public/index.html'));
});

// Start
app.listen(app.get('port'), function() {
  console.log('Fired up on port ' + app.get('port'));
});