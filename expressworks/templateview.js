if(process.argv.length < 3)
	console.log('please provider the port and page to render as arguments');

var express = require('express');
var path = require('path');
var app = express();

var port = process.argv[2];
var pageToRender = process.argv[3];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/home', function(req, res) {
	var templateData = {
		date: new Date().toDateString()
	}
	res.render(pageToRender, templateData);
});

app.listen(port);