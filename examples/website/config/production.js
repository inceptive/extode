// While loading the configuration, we set this config active.
// You can but shoudn't load multiple configurations in sequence.
Ext.appConfig({

    // Hostname to use for client requests
    hostname: 'localhost',
    
    // Socket.io listening port
    ioPort: 9997,

    // Express listening port
    expressPort: 9996,

    // Mongo database connection string
    mongoConnectUri: 'mongodb://localhost/mnug_website'
});

