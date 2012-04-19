/**
 * @class Ext.app.Service
 *
 * Represents a service.
 *
 * To be used via: Ext.service({
 *     // Configuration goes here
 * })
 *
 * Each instance registers by it's name attribute and is
 * fetchable by:
 *
 * var service = Ext.getService('nameOfTheService');
 */
Ext.define('Ext.app.Service', {

    mixins: ['Ext.util.ClassObservable'],

    statics: {

        /**
         * Defines a service
         *
         * @param {Object} cfg Service configuration
         * @return void
         */
        create: function(cfg) {

            if (typeof global.Services == "undefined") {
                global.Services = {};
            };
            return global.Services[cfg.name] = cfg;
        },


        /**
         * Returns the service instance for a name
         *
         * @param {String} name Name of the service
         * @return {Ext.app.Service}
         */
        get: function(name) {
            return global.Services[name];
        }
    },


    /**
     * @cfg {String} name Name of the service
     */
    name: '',


    /**
     * Constructor for the service class
     *
     * @param {Object} cfg Config overlay
     * @return void
     */
    constructor: function(cfg) {

        // Overlay all given Ext.service()
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
     * Configures event handler mappings
     *
     * // As object mapping (MULTI)
     * this.handle({
     *     gamestart: function(payload) {
     *         alert('Game started: ', payload);
     *     }, {...}
     * });
     *
     * // For a single event handling (SINGLE)
     * this.handle('gamestart', function(payload) {
     *     alert('Game started: ', payload);
     * });
     *
     * @param {Object} selectorObj Selector as described above
     * @param {Function} cb Callback (Optional, only required for SINGLE event handling)
     * @return void
     */
    handle: function(selectorObj) {

        var me = this, handleEvent = function(eventName, cb) {
        
            if (Ext.isDefined(eventName) && Ext.isString(eventName) && 
                Ext.isDefined(cb) && Ext.isFunction(cb)) {
                global.App.getSocket().on(eventName, Ext.Function.bind(cb, me));
            
            } else {
                throw "You need to specify an event name and a callback function for every event you want to handle. Currently given: eventName: " + eventName + " and as function: " + cb;
            }
        }, eventName;
        
        if (Ext.isObject(selectorObj)) {

            // Walk over the event names in selector object
            // and bind them to function callbacks on the socket
            for (eventName in selectorObj) {
                handleEvent(eventName, selectorObj[eventName]);
            }
        } else {
            handleEvent(selectorObj, arguments[1]);
        }
    },
    
    
    /**
     * Emits the given payload with a named event
     * @param {String} eventName Name of the event
     * @param {Object} payload Payload to emit
     * @return void
     */
    emit: function(evtName, payload) {
        global.App.getSocket().emit(evtName, payload);
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
Ext.service = Ext.app.Service.create;
Ext.getService = Ext.app.Service.get;
