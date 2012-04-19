/**
 * @class Ext.app.Model
 *
 * Represents a model.
 *
 * To be used via: Ext.model({
 *     // Configuration goes here
 * })
 *
 * Each instance registers by it's name attribute and is
 * fetchable by:
 *
 * var model = Ext.getModel('nameOfTheModel');
 */
Ext.define('Ext.app.Model', {

    mixins: ['Ext.util.ClassObservable'],

    statics: {

        /**
         * Defines a model and registers it's views generically.
         *
         * @param {Object} cfg Model configuration
         * @return void
         */
        create: function(cfg) {

            if (typeof global.Models == "undefined") {
                global.Models = {};
            };
            return global.Models[cfg.name] = new Ext.app.Model(cfg);
        },


        /**
         * Returns the model instance for a name
         *
         * @param {String} name Name of the model
         * @return {mongoose.Schema}
         */
        get: function(name) {
            return global.App.mongoose.model(name);
        }
    },


    /**
     * @cfg {String} name Name of the service
     */
    name: '',


    /**
     * @cfg {Object} pre Pre execution methods
     */
    pre: {},


    /**
     * @cfg {Object} post Post execution methods
     */
    post: {},


    /**
     * Mongoose schema reference
     * @private
     */
    schema: {},


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
        this.defineModel();
    },


    /**
     * Get's automatically called on instance creation.
     * @return void
     */
    defineModel: function() {

        var Schema = global.App.mongoose.Schema,
            fieldName = null,
            preName = null, postName = null;

        for (fieldName in this.schema) {

            // Resolve the String based datatype to an object reference
            if (Ext.isString(this.schema[fieldName])) {
                this.schema[fieldName] = global.App.mongoose.Schema[this.schema[fieldName]] || eval(this.schema[fieldName]);
            }

            // Resolve the String based datatype in an object field
            // definition to an object reference
            if (Ext.isObject(this.schema[fieldName]) && Ext.isDefined(this.schema[fieldName].type)) {
                this.schema[fieldName].type = global.App.mongoose.Schema[this.schema[fieldName].type] || eval(this.schema[fieldName].type);
            }
        }
        
        // Create a new schema instance
        // Second argument is to ensure mongoose is using the right collection name
        this.schema = new Schema(this.schema, {collection: this.name});

        // Register pre execution fn's
        for (preName in this.pre) {
            this.schema.pre(preName, this.pre[preName]);
        }

        // Register post execution fn's
        for (postName in this.post) {
            this.schema.post(postName, this.post[postName]);
        }

        // Allow accessing the model through the mongoose API (see static get(), Ext.getModel())
        // Third argument is to ensure mongoose is using the right collection name
        global.App.mongoose.model(this.name, this.schema, this.name);
    },


    /**
     * Returns the models schema
     * @return {mongoose.Schema}
     */
    getSchema: function() {
        return this.schema;
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
Ext.model = Ext.app.Model.create;
Ext.getModel = Ext.app.Model.get;
