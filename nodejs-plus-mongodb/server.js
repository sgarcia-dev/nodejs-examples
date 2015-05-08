var mongoose = require('mongoose');
var UserModel = require('./models/user');

var db = mongoose.connect('mongodb://dev:dev@ds031632.mongolab.com:31632/mongodev', console.error.bind(console));
db.connection.on('open', onConnectionOpen);
db.connection.on('error', console.error.bind(console));

function onConnectionOpen() {
	UserModel.findById('554be28d7c5e5df96807a119', function(err, data) {
		if (err) return console.log(err);
		console.log(data);
	});
	//Data.getAllUsers(function(users) { console.log(JSON.stringify(users)); }); // View all users
}