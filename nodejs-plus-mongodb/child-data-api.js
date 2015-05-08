var ModelDataApi = require('./model-data-builder');
var User = require('./models/child');
var childDataApi = new ModelDataApi('child', User, ['name', 'surname', 'age', 'parentid']);

module.exports = childDataApi;