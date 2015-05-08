var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    name: String,
    role: String,
    age: Number,
    hardware: Array
});

module.exports = mongoose.model('employee', employeeSchema);