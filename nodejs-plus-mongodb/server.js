var mongoose = require('mongoose');
var Data = require('./data.js');

var db = mongoose.connect('mongodb://dev:dev@ds031632.mongolab.com:31632/mongodev', console.error.bind(console));
db.connection.on('open', onConnectionOpen);
db.connection.on('error', console.error.bind(console));

function onConnectionOpen() {
	//test1(); // Create Test
	//test2(); // Get Test
	//test3(); // Edit Test
	//test4(); // Delete Test
	Data.getAllUsers(function(users) { console.log(JSON.stringify(users)); }); // View all users
}

function test1() {
	Data.createUser('Denisse', 'Martinez', 20, false, function() {
		console.log("Denisse saved succesfully");
	});
	Data.createUser('Sergei', 'Garcia', 20, false, function() {
		console.log("Sergei saved succesfully");
	});
}

function test2() {
	Data.getUser({ name: 'Denissee', surname: 'Martinez'}, function(user) {
		console.log(user);
	});
}

function test3() {
	Data.editUser({ 
		name: 'Martinez',
		surname: 'Denisse'
	}, {
		name: 'Denisse',
		surname: 'Martinez'
	}, function() {
		console.log("#### Edit succesful ####")
	});
}

function test4() {
	Data.deleteUser({
		name: 'Sergei',
		surname: 'Garcia'
	}, function() {
		console.log('delete succesfull.');
	})
}