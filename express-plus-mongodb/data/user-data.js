var UserModel = require('../model/user');

var UserCRUD = {
    createUser: createUser,
    getUser: getUser,
    getUsers: getUsers,
    getAllUsers: getAllUsers,
    editUser: editUser,
    deleteUser: deleteUser,
    model: UserModel
};

function createUser(name, surname, age, married, onComplete) {
    // create new Mongoose.Model
    var user = new UserModel({
        id: _uuid(),
        name: name,
        surname: surname,
        age: age,
        married: married
    });
    console.log("Saving user...");
    // save user and use the onComplete callback with the _handlerBuilder()
    user.save(_handlerBuilder(onComplete));
}

function getUser(queryObject, onComplete) {
    UserModel.find(queryObject, function callback(err, user) {
        // error checking
        if (err) return console.error(err);
        // check for nulls
        if (!_notEmpty(user)) return console.error('[ERROR] UserData.getUser(): No Data. Query Object:\n' + JSON.stringify(queryObject));
        // extract from array
        if (user.constructor === Array)
            user = user[0];
        onComplete(user);
    });
}

function getUsers(queryObject, onComplete) {
    UserModel.find(queryObject, function callback(err, users) {
        // check for errors
        if (err) return console.error(err);
        // check for nulls
        if (!_notEmpty(users)) return console.error('[ERROR] UserData.getUsers(): No Data. Query Object:\n' + JSON.stringify(queryObject));
        onComplete(users);
    });
}

function getAllUsers(onComplete) {
    UserModel.find({}, function callback(err, users) {
        // check for errors
        if (err)
            return console.error(err);
        // check for nulls
        if (!_notEmpty(users)) return console.error('[ERROR] UserData.getAllUsers(): No Data');
        onComplete(users);
    });
}

function editUser(queryObject, modifieduser, onComplete) {
    // local get method has null/empty result checking already, no need to check again
    getUser(queryObject, function(user) {
        // for each property in the modified user
        for (var property in modifieduser) {
            // modify property on the unmodified user
            user[property] = modifieduser[property];
        }
        // save original user
        user.save(_handlerBuilder(onComplete));
    });
}

function deleteUser(queryObject, onComplete) {
    // local get method has null/empty result checking already, no need to check again
    getUser(queryObject, function(user) {
        // delete user
        user.remove(_handlerBuilder(onComplete));
    });
}

function _notEmpty(data) {
    if (data === null || data === undefined) {
        console.error('[ERROR] _notEmpty(): null/undefined');
        return false;
    }
    if (data.constructor === Array && data.length == 0) {
        console.error('[ERROR] _notEmpty(): empty array');
        return false;
    }
    return true;
}

function _handlerBuilder(callback) {
    return function(err) {
        if (err)
            return console.error(err);
        callback();
    };
}

// unique number generator
function _uuid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

module.exports = UserCRUD;