var net = require('net');

var port = process.argv[2];

var server = net.createServer(serverHandler);
function serverHandler(socket) {
	var date = new Date();
	var dateString = date.getFullYear() + '-0' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + '\n';
	socket.end(dateString);
}

server.listen(port);