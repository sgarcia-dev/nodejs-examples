var fs = require("fs");
var path = require("path");

var directory = process.argv[2];
var extension = "." + process.argv[3];
fs.readdir(directory, function (err, list) {
	if (err) {
		console.error(err);
	}
	return list.forEach(function (file) {
		if (path.extname(file) === extension) {
			return console.log(file);
		}
	});
});