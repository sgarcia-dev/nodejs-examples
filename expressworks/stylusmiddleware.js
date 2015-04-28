if(process.argv.length < 3)
	console.log('please provider the port and page to render as arguments');

var port = process.argv[2];
var fileDirectory = process.argv[3];

var express = require('express');
var stylus = require('stylus');
var app = express();

app.use(express.static(fileDirectory));

app.use(stylus.middleware(fileDirectory));

app.listen(port);