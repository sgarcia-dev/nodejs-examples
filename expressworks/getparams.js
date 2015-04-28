if(process.argv.length < 3)
	console.log('please provider the port and page to render as arguments');

var port = process.argv[2];

var express = require('express');
var app = express();

app.get('/search', function(req, res){
	var query = req.query
	res.send(query) // outputs json
})
app.listen(port);