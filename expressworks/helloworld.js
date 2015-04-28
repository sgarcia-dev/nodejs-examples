var express = require('express')

if(process.argv.length < 3)
	return console.log('please provide the port number as the third parameter');
var port = process.argv[2];

var app = express()
app.get('/home', function (req, res) {
	res.end('Hello World!')
})
app.listen(port);
console.log('listening on localhost:' + port);