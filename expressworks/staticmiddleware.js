if (process.argv.length < 3)
	return console.log('please include the port and file name as aditional parameters respectively');

var path = require('path')
var express = require('express')
var app = express()

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.argv[2])
console.log();