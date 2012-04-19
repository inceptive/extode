// Requires required framework files
require("../Bootstrap.js")

// Set the App directory 
// (needed for the Application layer to autoload 
// the controllers and views)
Ext.setAppDir(__dirname);

// You should add additional files / modules here
// You can use the Ext's API here too, if the Bootstrap.js
// triggers a require on the Extode framework files.
// e.g.: 
//
// Ext.require("./MyAdditionalFile.js", function() {
//     Ext.log('Yeps, it works!');   
// });