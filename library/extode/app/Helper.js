/**
 * @class Ext.app.Helper
 *
 * Represents a global helper. Helpers get executed on server-side.
 * Helpers are objects containing code, available globally from anywhere.
 * For instance you're in a Service, Servlet or even an .ejs template file,
 * you can call:
 *
 * var contentHelper = Ext.getHelper('Content');
 * contentHelper.getContentById(233, function(err, docs) {
 *     // ...
 * });
 *
 * Therefore your add the value 'Content' the the helpers array in your
 * Application configuration:
 *
 * Ext.application({
 *
 *     helpers: ['content'],
 *     ...
 * });
 *
 * And create a file called app/helper/Content.js.
 * You need to put the helper object members in there
 * by using the Ext.helper() method:
 *
 * Ext.helper({
 *
 *     // Important: Identify the helper by name!
 *     name: 'Content',
 *
 *     // Object members go here
 *     getContentById: function(id, fn) {
 *
 *         var Content = Ext.getModel('Content');
 *         Content.findById({_id: id}, fn);
 *     }
 * });
 */
Ext.define('Ext.app.Helper', {

    mixins: ['Ext.util.ClassObservable'],

    statics: {

        /**
         * Defines a helper
         *
         * @param {Object} cfg Helper configuration
         * @return void
         */
        create: function(cfg) {

            if (typeof global.Helpers == "undefined") {
                global.Helpers = {};
            };
            return global.Helpers[cfg.name] = new Ext.app.Helper(cfg);
        },


        /**
         * Returns the helper instance for a name
         *
         * @param {String} name Name of the helper
         * @return {Ext.app.Helper}
         */
        get: function(name) {
            return global.Helpers[name];
        }
    },


    /**
     * @cfg {String} name Name of the helper
     */
    name: '',


    /**
     * Constructor for the helper class
     *
     * @param {Object} cfg Config overlay
     * @return void
     */
    constructor: function(cfg) {

        // Overlay all given Ext.helper()
        // configs to this instance
        Ext.apply(this, cfg);
        
        // Call the init() method
        this.init();
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
Ext.helper = Ext.app.Helper.create;
Ext.getHelper = Ext.app.Helper.get;
