var http = require('http');
var BufferList = require('bl');

var urls = process.argv.slice(2);
var urlNumber = urls.length;
var urlData = {};

urls.forEach(function (element, index) {
	http.get(element, function (response) {
		return response.pipe(
			BufferList(function (err, data) {
				if (err)
					return err;

				urlData[element] = data.toString();
				urlNumber--;
				if (urlNumber==0)
					urls.forEach(function(element, index) {
						console.log(urlData[element]);
					});
			})
		);
	});
})