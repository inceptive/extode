// Requires required framework files
require("../Bootstrap.js")

// Set the App directory 
// (needed for the Application layer to autoload 
// the controllers and views)
Ext.setAppDir(__dirname);

// How to fetch first cmd argument?!

// Check the thrid argument (envName) (e.g. node AppServer.js $envName)
// for a given environment name which configuration is to load
var envName = "development",
    _envName = undefined;

if (Ext.isDefined(process.env.NODE_ENV)) {
    _envName = process.env.NODE_ENV;
}


if (Ext.isDefined(process.argv[2])) {
    _envName = process.argv[2];
}

if (Ext.isDefined(_envName)) {
    envName = _envName;
}

Ext.info("Environment specified: ", envName);

// Load configuration
require(__dirname + "/config/" + envName + ".js");

// Catch all exception handler
process.on('uncaughtException', function (err) {
  Ext.warn('Uncaught exception: ' + err + err.stack);
});

// You should add additional files / modules here
// You can use the Ext's API here too, if the Bootstrap.js
// triggers a require on the Extode framework files.
// e.g.: 
//
// Ext.require("./MyAdditionalFile.js", function() {
//     Ext.log('Yeps, it works!');   
// });


// Cleaning memory
delete _envName, envName;