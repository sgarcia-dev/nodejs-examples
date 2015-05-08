/* global log */
function modelDataBuilder(_name, _model, _properties) {
    _name = _name.substr(0, 1).toUpperCase() + _name.substr(1).toLowerCase();
    this.name = _name;
    this['create' + _name] = createModel;
    this['get' + _name] = getModel;
    this['get' + _name + 's'] = getModels;
    this['getAll' + _name + 's'] = getAllModels;
    this['edit' + _name] = editModel;
    this['delete' + _name] = deleteModel;
    this.Model = _model;
    this.modelProperties = _properties;

    var self = this;

    function createModel(params, _callback) {
        // create property object
        var modelPropSet = self.__modelPropertySetBuilder(params);
        // add an unique ID
        modelPropSet.id = self.__uuid();
        // build the object
        var model = new self.Model(modelPropSet);
        
        // save model and use the onComplete callback with the __handlerBuilder()
        model.save(self.__handlerBuilder(_callback));
    }
    
    var model = require("model");
    function getModel(req, res){
        var name = req.params.name;
        model.findOne({name: name}, function(err, result){
            if(err){
            }
            if(result){
                child.findOne({parentid: result.id}, function)
            }
        })
    }
    
    function save(req, res)

    function getModel(params, _callback) {
        // create property object
        var queryObject = self.__modelPropertySetBuilder(params);
        // find model
        self.Model.find(queryObject, function callback(err, model) {
            // error checking
            if (err)
                return log.error(self.name + ' DataModel error: get' + self.name + '() had an error', err);
            // check for nulls
            if (!self.__notEmpty(model))
                return log.error(self.name + ' DataModel error: get' + self.name + '() returned nothing', JSON.stringify(queryObject));
            // extract from array
            if (model.constructor === Array)
                model = model[0];
            _callback(model);
        });
    }

    function getModels(params, onComplete) {
        // create property object
        var queryObject = self.__modelPropertySetBuilder(params);
        // find models
        self.Model.find(queryObject, function callback(err, models) {
            // check for errors
            if (err)
                return log.error(self.name + ' DataModel error: get' + self.name + 's() had an error', err);
            // check for nulls
            if (!self.__notEmpty(models))
                return log.error(self.name + ' DataModel error: get' + self.name + 's() returned nothing', JSON.stringify(queryObject));
            onComplete(models);
        });
    }

    function getAllModels(_callback) {
        self.Model.find({}, function callback(err, models) {
            // check for errors
            if (err)
                return console.error(err);
            // check for nulls
            if (!self.__notEmpty(models))
                return log.error(self.name + ' DataModel error: getAll' + self.name + 's() returned nothing', 'No description provided');
            _callback(models);
        });
    }

    function editModel(_params, _updatedModel, _callback) {
        // local get method has null/empty result checking already, no need to check again
        getModel(_params, function(model) {
            // for each property in the modified model
            for (var property in _updatedModel) {
                // modify property on the unmodified model
                model[property] = _updatedModel[property];
            }
            // save original model
            model.save(self.__handlerBuilder(_callback));
        });
    }

    function deleteModel(_params, _callback) {
        // local get method has null/empty result checking already, no need to check again
        getModel(_params, function(model) {
            // delete model
            model.remove(self.__handlerBuilder(_callback));
        });
    }



}

// property builder to build a valid mongoose.Mode query object
modelDataBuilder.prototype.__modelPropertySetBuilder = function(_rawQueryObj) {
    var verifiedQueryObj = {};
    this.modelProperties.forEach(function(property) {
        if (_rawQueryObj[property] != null)
            verifiedQueryObj[property] = _rawQueryObj[property];
    });
    return verifiedQueryObj;
}


// null checking
modelDataBuilder.prototype.__notEmpty = function(data) {
    if (data === null || data === undefined) {
        log.error('Invalid Data', 'Data is null or undefined');
        return false;
    }
    if (data === "") {
        log.error('Invalid Data', 'Data is an empty string');
        return false

    }
    if (data.constructor === Array && data.length == 0) {
        log.error('Invalid Data', 'Data is an empty array');
        return false;
    }
    return true;
}

// callback builder that checks for errors before calling the callback
modelDataBuilder.prototype.__handlerBuilder = function(_callback) {
    return function(err) {
        if (err)
            return console.error(err);
        _callback();
    };
}

// unique number generator
modelDataBuilder.prototype.__uuid = function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

module.exports = modelDataBuilder;DataApi;