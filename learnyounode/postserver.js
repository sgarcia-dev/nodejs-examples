var http, map, server;

http = require('http');

map = require('through2-map');

server = http.createServer(function (req, res) {
	if (req.method !== 'POST') {
		return res.send("POST request plz!");
	}
	return req.pipe(map(function (chunk) {
		return chunk.toString().toUpperCase();
	})).pipe(res);
});

server.listen(process.argv[2]);