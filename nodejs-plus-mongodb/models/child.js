var mongoose = require('mongoose');

var childSchema = mongoose.Schema({
    id: String,
    name: String,
    surname: String,
    age: Number,
    parentid: String
});

module.exports = mongoose.model('child', childSchema);