var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id: String,
    name: String,
    surname: String,
    age: Number,
    married: Boolean
});

module.exports = mongoose.model('user', userSchema);