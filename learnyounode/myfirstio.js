var fs = require('fs');
var buffer = fs.readFileSync(process.argv[2]);
var text = buffer.toString();
var paragraphs = text.split('\n');
console.log(paragraphs.length - 1);