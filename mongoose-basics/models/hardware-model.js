var mongoose = require('mongoose');

var hardwareSchema = mongoose.Schema({
    type: String,
    model: String,
    assigned: Boolean,
    employeeid: String
});

module.exports = mongoose.model('hardware', hardwareSchema);