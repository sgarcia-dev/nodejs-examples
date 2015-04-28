var fs, path;
fs = require('fs');
path = require('path');

module.exports = function (dirname, ext, callback) {
	ext = "." + ext;
	return fs.readdir(dirname, function (err, files) {
		if (err) {
			return callback(err, null);
		}
		files = files.filter(function (file) {
			return path.extname(file) === ext;
		});
		return callback(null, files);
	});
};