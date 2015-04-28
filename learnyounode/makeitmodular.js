var lib = require('./makeitmodular-lib');
var dirname = process.argv[2];
var ext = process.argv[3];

lib(dirname, ext, function (err, files) {
	var file, _i, _len, _results;
	if (err) {
		return console.error("There was an error: ", err);
	}
	_results = [];
	for (_i = 0, _len = files.length; _i < _len; _i++) {
		file = files[_i];
		_results.push(console.log(file));
	}
	return _results;
});