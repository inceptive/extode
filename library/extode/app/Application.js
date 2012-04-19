/**
 * @class Ext.app.Application
 *
 * Represents the application.
 * Instance registers as: App in global scope!
 *
 * To be used via: Ext.application({
 *     // Configuration goes here
 * })
 */
Ext.define('Ext.app.Application', {

    mixins: ['Ext.util.ClassObservable'],

    statics: {

        /**
         * Defines an application and registers it's services generically.
         *
         * @param {Object} cfg Application configuration
         * @return void
         */
        create: function(cfg) {
            return new Ext.app.Application(cfg);
        }
    },


    /**
     * @cfg {String} name Name of the app
     */
    name: '',
    
    
    /**
     * @cfg {Boolean} enableDebugging Enables application debugging
     */
    enableDebugging: false,
    
    
    /**
     * @cfg {Boolean} autoServeHttp Automatically serves static files for requests from the app folder
     */
    autoServeStaticFiles: true,


    /**
     * @cfg {Array} services Service names
     */
    services: [],


    /**
     * @cfg {Array} servlets Servlet names
     */
    servlets: [],


    /**
     * @cfg {Array} models Model names
     */
    models: [],


    /**
     * @cfg {Array} helpers Helper names
     */
    helpers: [],


    /**
     * @cfg {String} appFolder Application folder
     */
    appFolder: 'app',
    
    
    /**
     * @cfg {String} webFolder Web folder inside the app folder
     */
    webFolder: 'www',
    
    
    /**
     * Socket reference
     * @private
     */
    socket: null,
    
    
    /**
     * @cfg {Object} io Socket.io reference
     */
    io: null,
    
    
    /**
     * @cfg {Number} ioPort Socket.io port (default)
     */
    ioPort: 9998,
    
    
    /**
     * @cfg {Object} express Express webserver reference
     */
    express: null,


    /**
     * Express server instance
     * @private
     */
    expressServer: null,
    
    
    /**
     * @cfg {Number} expressPort Express webserver port (default)
     */
    expressPort: 9999,


    /**
     * @cfg {Object} mongoose Mongoose module reference
     */
    mongoose: null,


    /**
     * @cfg {Object} mongoStore Mongo store module reference
     */
    mongoStore: null,


    /**
     * @cfg {String} mongoConnectUri MongoDB connection uri string (e.g. mongodb://localhost/$dbName)
     */
    mongoConnectUri: '',
    
    
    /**
     * @cfg {Object} mime Mime-magic module reference
     */
    mime: null,
    
    
    /**
     * @cfg {Object} ejs Embedded JS template engine reference
     */
    ejs: null,
    
    
    /**
     * Filesystem module reference
     * @private
     */
    fs: require('fs'),
    
    
    /**
     * Constructor for the application class
     *
     * @param {Object} cfg Config overlay
     * @return void
     */
    constructor: function(cfg) {

        // Overlay all given Ext.application()
        // configs to this instance
        Ext.apply(this, cfg);

        // Apply loaded app config on local instance
        Ext.apply(this, Ext.getAppConfig());
        
        // Global application reference if the
        // Application was already created
        global.App = this;

        // Starting servers
        this.startMongoose();
        this.startExpress();
        this.startSocketIo();

        // Apply an app profile
        if (Ext.isDefined(cfg.enableDebugging)) {
            Ext.enableDebugging = cfg.enableDebugging;
        }


        // Load helpers (Will be instanciated directly)
        Ext.loadClassesByNames(this.helpers, Ext.getAppDir() + "/" + this.appFolder + "/helper");

        // Load servlets (Will be instanciated directly)
        Ext.loadClassesByNames(this.servlets, Ext.getAppDir() + "/" + this.appFolder + "/servlet");
    
        // Load services (Will be instanciated on connection event)
        Ext.loadClassesByNames(this.services, Ext.getAppDir() + "/" + this.appFolder + "/service");


        // Automatically serve static files from HTTP requests
        if (Ext.isDefined(cfg.autoServeStaticFiles) &&
            cfg.autoServeStaticFiles === true) {

            // Initialize the default servlets
            this.initDefaultServlets();
        }


        // Initialize a listening the socket
        this.initSocket();
        
        // Call the launch() method
        this.launch();
    },


    /**
     * Express webserver start
     * @retrun void
     */
    startExpress: function() {

        Ext.info('Starting Express webserver on port: ' + this.expressPort);

        // Start express webserver
        this.expressServer = this.express.createServer();

        this.expressServer.use(this.express.methodOverride());
        this.expressServer.use(this.express.cookieParser());
        this.expressServer.use(this.express.responseTime());
        this.expressServer.use(this.express.session({
            secret: 'extode',
            store: this.mongoStore({
                url: this.mongoConnectUri
            })
        }));
           
        this.expressServer.listen(this.expressPort);
    },


    /**
     * Start socket.io
     * @return void
     */
    startSocketIo: function() {

        Ext.info('Starting seockt.io on port: ' + this.ioPort);
        this.io = this.io.listen(this.ioPort);
    },


    /**
     * Starts the mongoose model code and connects to MongoDB
     * @return void
     */
    startMongoose: function() {

        Ext.info('Starting mongoose and connecting to MongoDB. Any command will be buffered until real connect.');

        // Connect to a MongoDB database if set
        if (this.mongoose !== null) {

            this.mongoose.connect(this.mongoConnectUri);

            // If mongoose is active, we load models
            Ext.loadClassesByNames(this.models, Ext.getAppDir() + "/" + this.appFolder + "/model");
        }
    },
    
    
    /**
     * Needs to be called in initSocket() after the
     * socket.io configuration has finished and a 
     * listening sockets config object (io) was created
     * @private
     */
    initSocket: function() {
    
        var io = this.io, me = this;
        
        if (!Ext.isDefined(io) || io === null || !Ext.isDefined(io.sockets) || io.sockets === null) {
            throw "No valid socket.io configuration created on first line of App.js. Please recheck to create an instance of var io = require($pathToSocketDotIo).listen($config) there!"
        }
    
        // On socket connect, call launch() 
        io.sockets.on('connection', function (socket) {
        
            me.socket = socket;
            
            // Initializes the registered services
            me.initServices();
        });
    },
    
    
    /**
     * Initializes the services specified by
     * this.services.
     *
     * @private
     * @return void
     */
    initServices: function() {
        
        // Create an instance of each registered service
        for (name in global.Services) {
            new Ext.app.Service(global.Services[name]);
        }

        // Initialize the default services
        this.initDefaultServices();
    },


    /**
     * Starts the automatic listening for partial content
     * socket events
     * @return void
     */
    initDefaultServices: function() {

        // Create an instance of the partial service
        new Ext.service.Partial();
    },

    
    /**
     * Starts the automatic dispatching of static files
     * via HTTP
     * @return void
     */
    initDefaultServlets: function() {

        var me = this;

        // Async content delivery JavaScript support library delivery
        Ext.servlet({
            name: 'AsyncDelivery',
            init: function() {
                this.handle("GET", "/Extode/__PartialSupport__.js", function(req, res) {

                    var script =  Ext.service.Partial.getPartialWebSupportScript();
                    res.writeHead(200, {'Content-Type': 'text/javascript'});
                    res.write(script, "binary");
                    res.end();

                    delete script;
                });
            }
        });


        // Default file delivery servlet
        Ext.servlet({
            name: 'Default',
            init: function() {
                this.handle("GET", "/*", Ext.Servlet.dispatchStaticFiles);
            }
        });
    },
    
    
    /**
     * Returns the connected socket 
     * @return {Object}
     */
    getSocket: function() {
        return this.socket;
    },
    
    
    /**
     * Returns the express webserver reference 
     * @return {Object}
     */
    getExpress: function() {
        return this.expressServer;
    },


    /**
     * Returns the web folder path
     * @return {String}
     */
    getWebFolderPath: function() {
        return global.App.appFolder + "/" + global.App.webFolder;
    },
    

    /**
     * Get's automatically called on app launch.
     * @return void
     */
    launch: function() {}
});

// Shortcut
Ext.application = Ext.app.Application.create;
