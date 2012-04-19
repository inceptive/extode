/**
 * @class Ext.app.Config
 *
 * Represents an application configuration
 *
 * To be used via: Ext.appConfig({
 *     // Configuration goes here
 * })
 *
 * var appConfig = Ext.getAppConfig('nameOfTheConfig');
 */
Ext.define('Ext.app.Config', {

    mixins: ['Ext.util.ClassObservable'],

    statics: {

        /**
         * Defines and registers an application configuration
         *
         * @param {Object} cfg App configuration
         * @return void
         */
        create: function(cfg) {

            if (typeof global.Configs == "undefined") {
                global.Configs = {};
            };

            // Set the last loaded / created config active
            Ext.appConfig = cfg;
            
            return global.Configs[cfg.name] = cfg;
        },


        /**
         * Returns the config instance for a name
         *
         * @param {String} name Name of the config
         * @return {Ext.app.Config}
         */
        get: function(name) {
            return global.Configs[name];
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
     * Returns the App instance reference
     * Take care that this method will fail when the app is
     * not already instanciated!
     * @return {Ext.app.Application}
     */
    getApp: function() {
        return global.App;
    }
});

// Shortcut
Ext.appConfig = Ext.app.Config.create;
Ext.getAppConfig = Ext.app.Config.get;
