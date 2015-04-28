var mongoose = require('mongoose');
mongoose.connect('mongodb://dev:dev@ds031632.mongolab.com:31632/mongodev', function (error) {
	if (error) {
		console.log(error);
	}
});