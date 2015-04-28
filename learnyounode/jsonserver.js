var http, server, url;

http = require('http');
url = require('url');

server = http.createServer(function (req, res) {
	var date, path;
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	path = url.parse(req.url, true);
	date = new Date(path.query.iso);
	if (path.pathname === '/api/parsetime') {
		res.end(JSON.stringify({
			hour: date.getHours(),
			minute: date.getMinutes(),
			second: date.getSeconds()
		}));
	}
	if (path.pathname === '/api/unixtime') {
		return res.end(JSON.stringify({
			unixtime: date.getTime()
		}));
	}
});

server.listen(process.argv[2]);