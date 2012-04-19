var io = require('socket.io'),
    ejs = require('ejs'),
    express = require('express'),
    mime = require('mime'),
    mongoose = require('mongoose'),
    mongoStore = require('support/connect-mongodb');

// Requires required framework files
require("./Bootstrap.js")

Ext.application({
    
    // Map io to app
    io: io,
    ioPort: 9998,
    
    // Mime module reference
    mime: mime,
    
    // Express WebServer
    express: express,
    expressPort: 9999,

    // EJS reference
    ejs: ejs,
    
    // Sample app name
    name: 'ReplyService',
    
    
    // Sample app services loaded
    // from $appFolder/service/$name.js
    services: [
        "Reply"
    ],
    
    
    // Sample app servlets loaded
    // from $appFolder/servlet/$name.js
    servlets: [],
    
    
    // Enables the dispatching of static files
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