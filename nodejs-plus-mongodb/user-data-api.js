var ModelDataApi = require('./model-data-builder');
var User = require('./models/user');
var userDataApi = new ModelDataApi('user', User, ['name', 'surname', 'age', 'married']);

module.exports = userDataApi;