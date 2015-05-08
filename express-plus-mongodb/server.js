/* global log */
var express = require('express');
var mongoose = require('mongoose');
global.log = require('./logger');

//var userData = require('./data/user-data');

var port = process.env.PORT;

var app = express();
var db = mongoose.connect('mongodb://dev:dev@ds031632.mongolab.com:31632/mongodev', console.error.bind(console));
db.connection.on('error', console.error.bind(console));


app.get('/api/v1.0/user', function(req, res) {
    var params = req.query;
    //userData.getUsers(params, function(users) {
    //   res.send(users); 
    //});
});

log.error('an error ocurred', 'description goes here');

log.warning('an error ocurred', 'description goes here');

log.log('description goes here');
app.listen(port);