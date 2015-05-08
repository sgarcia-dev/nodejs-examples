/*
IMPORTANT: This example uses a hosted mongodb database to avoid needing
a local mongo installation. On first run, create your own free mongodb
database at https://mongolab.com/ and replace the temp mongoURL with your
own mongo database hosted instance url (MongoLab will tell you what it is)

FAQ:
1. Where is my mongolab database URL?
A: After creating an accuont, and creating your first database, navigate to
   https://mongolab.com/databases/<databasename>, it should be on top. Looks
   something like this: 
   mongodb://<dbuser>:<dbpassword>@<dbid>.mongolab.com:<dbport>/<dbname>

2. Why is my user or password not getting recognized in the url?
A: You must create a new user and password for each mongodb database. This is
   commonly done at https://mongolab.com/databases/<yourdbname>#users
*/

// mongodb javascript adapter NPM module
var mongoose = require('mongoose');
// Import the Employee Model, located in the local models/ folder
var EmployeeModel = require('./models/employee-model');

// REPLACE THIS
var mongoURL = 'mongodb://dev:dev@ds031632.mongolab.com:31632/mongodev';

/* ------------------------------------------------------------------------
INITIALIZATION
------------------------------------------------------------------------ */
// connect to mongodb instance
mongoose.connect(mongoURL, onDBConnect);
// check for connection errors
mongoose.connection.on('error', onDBError);
// callback for connection errors
function onDBError(error) {
    console.error(error);
}

// callback to execute on connection attempt.
function onDBConnect(error) {
    if (error)
        console.error(error);
    console.log('Connection succesful!');
    /* ------------------------------------------------------------------------
    EXAMPLES
    ------------------------------------------------------------------------ */
    // Feel free to comment and uncomment whichever function you would like to try out
    // The functions are at the bottom so you can learn how to do this yourself.

    /*---------------------------------- 
    CREATE EMPLOYEE
    ---------------------------------
    createEmployee({
        name: 'Sergei Garcia',
        role: 'Software Engineer Associate',
        age: 21
    }, function onSuccess() {
        console.log('Employee create succesful!');
    });
    /**/
    /*---------------------------------- 
    FIND EMPLOYEE 
    --------------------------------- 
    getEmployee({
        name: 'Sergei Garcia'
    }, 1, function onFindSuccess(employee) {
        console.log('Employee found: ');
        console.log(JSON.stringify(employee));
    });
    /**/
    /*---------------------------------- 
    EDIT EMPLOYEE 
    --------------------------------- 
    getEmployee({ // get the employee
        name: 'Sergei Garcia'
    }, 1, function onFindSuccess(employee) {
        console.log('Employee found: ');
        console.log(JSON.stringify(employee));
        // modify it
        console.log('Editing employee...');
        editEmployee(employee, { name: 'Sergei Garcia', role: 'Software Engineer Awesomeciate' }, function onEditSuccess(editedEmployee) {
            console.log('Employee saved! New employee: ');
            console.log(JSON.stringify(editedEmployee));
        })
    });
    /**/
    /*---------------------------------- 
    DELETE EMPLOYEE 
    ---------------------------------
    getEmployee({ // get the employee
        name: 'Sergei Garcia'
    }, 1, function onFindSuccess(employee) {
        console.log('Employee found: ');
        console.log(JSON.stringify(employee));
        // Start deleting the employee
        console.log('Deleting employee...');
        deleteEmployee(employee, function onDeleteSuccess() {
            console.log('Employee Deleted!');
        })
    });
    /**/
    /*---------------------------------- 
    GET ALL EMPLOYEES! 
    --------------------------------- 
    // IMPORTANT: An empty query object will accept all found employees,
    // and a NULL "howMany" parameter default to all 
    getEmployee({}, null, function onFindSuccess(employee) {
        console.log('Got all employees!');
        console.log(JSON.stringify(employee));
    });
    /**/
}

/* ------------------------------------------------------------------------
FUNCTIONS
------------------------------------------------------------------------ */
function createEmployee(employeeData, callback) {
    // Create a new Mongoose.Model Employee Instance
    console.log('Creating new employee with the following data: \n' + JSON.stringify(employeeData));
    var employee = new EmployeeModel({
        name: employeeData.name,
        role: employeeData.role,
        age: employeeData.age
    });
    // Try to save the employee
    console.log('Saving...');
    employee.save(function saveHandler(error) {
        // check if an error returned
        if (error)
            return console.error(error);
        // execute the callback
        callback();
    });
}

function getEmployee(employeeQuery, howMany, callback) {
    // if only asked for one
    if (howMany === 1) {
        console.log('Finding 1 employee...');
        EmployeeModel.findOne(employeeQuery, function(error, data) {
            // check if an error returned
            if (error)
                return console.error(error);
            // check for an empty result
            if (data === null || data === undefined)
                return console.error('No employees found with the following Query: \n' + JSON.stringify(employeeQuery));
            // handle the data with the callback
            callback(data);
        });
    // if asked for more than one, or asked for all (null howMany param defaults to all)
    } else if (howMany > 1 || howMany === null) {
        console.log('Finding employees...');
        EmployeeModel.find(employeeQuery, function(error, data) {
            // check if an error returned
            if (error)
                return console.error(error);
            // handle the data with the callback
            callback(data);
        });
    }
}

function editEmployee(employee, editedProperties, callback) {
    // check if employee is not a valid EmployeeModel object to avoid errors
    if (employee.constructor !== EmployeeModel)
        return console.error('Edit Failed. Not a valid EmployeeModel object');
    // for each of the edited properties
    for (var property in editedProperties) {
        // replace the original employee propety with the new property
        employee[property] = editedProperties[property];
    }
    // save the employee back
    employee.save(function saveHandler(error) {
        // check for errors
        if (error)
            return console.error(error);
        // execute the callback
        callback(employee);
    });
}

function deleteEmployee(employee, callback) {
    // check if employee is not a valid EmployeeModel object to avoid errors
    if (employee.constructor !== EmployeeModel)
        return console.error('Delete Failed. Not a valid EmployeeModel object');
    employee.remove(function deleteHandler(error) {
        // check if no errors ocurred
        if (error)
            return console.error(error);
        // execute the callback
        callback();
    });
}