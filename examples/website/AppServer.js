/**
 * Call: node AppServer.js
 * or: node AppServer.js $envName
 * or: set the NODE_ENV environment variable
 */

// Development application configuration
var io = require('socket.io'),
    ejs = require('ejs'),
    express = require('express'),
    mime = require('mime'),
    mongoose = require('mongoose'),
    mongoStore = require('support/connect-mongodb');

// Requires required framework files
require("./Bootstrap.js")

Ext.application({
    
    // Mime module reference
    mime: mime,

    // Express WebServer
    express: express,
    
    // Map io to app
    io: io,
    
    // EJS reference
    ejs: ejs,

    // Mongose reference
    mongoose: mongoose,

    // Mongo store reference
    mongoStore: mongoStore,

    // Sample app name
    name: 'MNUG-Website',
    
    
    // Sample app services loaded
    // from $appFolder/service/$name.js
    services: [
        //"ContentEditor",
        //"Twitter"
    ],
    
    
    // Additional app servlets loaded
    // from $appFolder/servlet/$name.js
    servlets: [
        "Article"
    ],


    // MongoDB models
    models: [
        "Article"
    ],
    
    
    // Enables the dispatching of static and ejs files
    // from the $appFolder directory automatically
    autoServeStaticFiles: true,
    
    
    // Enables console output
    enableDebugging: true,
    
    
    /**
     * Get's automatically called on app launch.
     * @return void     
     */         
    launch: function() {
        log("AppServer Launch.");
    }
});