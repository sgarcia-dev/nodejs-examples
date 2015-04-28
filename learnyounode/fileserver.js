var http = require('http');
var fs = require('fs');

var file = process.argv[3];
var port = process.argv[2];

var server = http.createServer(function(callback, response) {
	var stream = fs.createReadStream(file);
	stream.pipe(response);
});
server.listen(port);