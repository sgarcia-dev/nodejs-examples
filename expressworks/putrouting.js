if(process.argv.length < 3)
	console.log('please provider the port and page to render as arguments');

var port = process.argv[2];

var express = require('express');
var crypto = require('crypto');
var app = express();

app.put('/message/:id', function(req, res) {
	var id = req.params.id;
	var encryptedResponse =crypto.createHash('sha1').update(new Date().toDateString() + id).digest('hex');
	res.send(encryptedResponse);
});

app.listen(port);