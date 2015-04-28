var fs = require('fs');
fs.readFile(process.argv[2], function(err, data) {
	if(err)
		return err;
	var text = data.toString();
	var paragraphs = text.split('\n');
	console.log(paragraphs.length - 1);
});