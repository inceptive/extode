/**
 * @class Ext.app.Servlet
 *
 * A servlet is a HTTP service for serving static resouces.
 *
 * To be used via: Ext.servlet({
 *     // Configuration goes here
 * })
 *
 * Each instance registers by it's name attribute and is
 * fetchable by:
 *
 * var servlet = Ext.getServlet('nameOfTheServlet');
 */
Ext.define('Ext.app.Servlet', {

    mixins: ['Ext.util.ClassObservable'],

    statics: {

        /**
         * Defines a servlet and registers it's views generically.
         *
         * @param {Object} cfg Servlet configuration
         * @return void
         */
        create: function(cfg) {

            if (typeof global.Servlets == "undefined") {
                global.Servlets = {};
            };
            
            // Servlets needs to be instanciated directly on
            // server startup while services get init'ed on socket connect
            return global.Servlets[cfg.name] = new Ext.app.Servlet(cfg);
        },


        /**
         * Returns the servlet instance for a name
         *
         * @param {String} name Name of the servlet
         * @return {Ext.app.Servlet}
         */
        get: function(name) {
            return global.Servlets[name];
        }
    },


    /**
     * @cfg {String} name Name of the servlet
     */
    name: '',


    /**
     * Constructor for the servlet class
     *
     * @param {Object} cfg Config overlay
     * @return void
     */
    constructor: function(cfg) {

        // Overlay all given Ext.servlet()
        // configs to this instance
        Ext.apply(this, cfg);
        
        // Call the init() method
        this.init();
    },


    /**
     * Get's automatically called on instance creation.
     * @return void
     */
    init: function() {},


    /**
     * Configures event handler mappings for HTTP requests
     *
     * this.handle("GET", "/index.ejs", function(request, response) {
     *     response.send("Have a lot of fun!");
     * });
     *
     * @param {String} method HTTP method to listen to
     * @param {String} path Path to apply/match to
     * @param {Function} cb Function to be called as callback if method and path are matching  for a HTTP request
     * @return {Mixed}
     */
    handle: function(method, path, cb) {

        var webserver = global.App.getExpress();
        return webserver[method.toLowerCase()](path, cb);
    },
    
    
    /**
     * Respond the given payload through the http response object
     * @param {Object} response Response event
     * @param {Mixed} payload Payload to respond
     * @return void
     */
    respond: function(response, payload) {
        response.send(payload);
    },


    /**
     * Returns the App instance reference
     * @return {Ext.app.Application}
     */
    getApp: function() {
        return global.App;
    }
});

// Shortcut
Ext.servlet = Ext.app.Servlet.create;
Ext.getServlet = Ext.app.Servlet.get;
