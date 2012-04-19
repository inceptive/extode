/**
 * @class Extode
 * @singleton
 * 
 * <b>ATTENTION: Namespace is Ext here anyway.</b>  
 * 
 * <p>
 * This base class of the Extanium framework introduces the 
 * Extanium namespace and all it's core methods and properties.
 * </p>
 * 
 * <p>
 * To be used by: (Best practice: application/Profile.js)
 * Ext.setProfile({
 *     // Configuration goes here
 * })  
 * </p>   
 *
 * @author Aron Homberg
 * @license MIT license
 */
Ext.apply(Ext, {


    frameworkName: 'Extode',

     
    /**
     * Contains the directory path to autoload app files from
     * @private
     */
    appDirPath: __dirname,


    /**
     * Default app config
     * @private
     */
    appConfig: {
        isDefault: true
    },

    
    /**
     * Loads classes by name from a specific base directory.
     * Classes can be specified as array.     
     * 
     * @param {Array} classNames Class names
     * @param {String} baseDir Base directory               
     * @return void
     */              
    loadClassesByNames: function(classNames, baseDir) {
        for (var i=0; i<classNames.length; i++) {
            Ext.require(baseDir + "/" + classNames[i] + ".js");
        }
    },
    
    
    /**
     * Loads the path specified
     *      
     * @param {String} path Path to load
     * @param {Function} cb Callback to call when file is loaded
     * @return {Mixed}          
     */         
    require: function(path, cb) {
        var inst = require(path);
        
        if (Ext.isDefined(cb) && Ext.isFunction(cb)) {
            cb(inst);
        }
        return inst;
    },
    
    
    /**
     * Sets the application's directory
     *
     * @param {String} appDirPath Application directory path
     * @retrun void
     */
    setAppDir: function(appDirPath) {
        Ext.appDirPath = appDirPath;
    },
    
    
    /**
     * Returns the previously set application directory path
     * or the path to the Extanium library.
     * @return {String}
     */
    getAppDir: function() {
        return Ext.appDirPath;
    },
    
    
    /**
     * Decodes a given json string to a native object
     *
     * @param {String} json JSON text
     * @return {Mixed}
     */
    decode: function(json) {
        return JSON.parse(json);
    },


    /**
     * Encodes a given object to a JSON string
     *
     * @param {Mixed} obj Native object
     * @return {String}
     */
    encode: function(obj) {
        return JSON.stringify(obj);
    },


    /**
     * Returns the App instance reference
     * @return {Ext.app.Application}
     */
    getApp: function() {
        return global.App;
    },


    /**
     * Returns the loaded application configuration.
     * It no configuration was loaded, this is an
     * empty default config object and an error will
     * be thrown. Ensure config/development.js exists.
     * @return {Object}
     */
    getAppConfig: function() {

        if (!Ext.isDefined(Ext.appConfig) || !Ext.isObject(Ext.appConfig)
            || Ext.isDefined(Ext.appConfig.isDefault)) {
            Ext.warn("Application confiugration is wasn't loaded correctly. "+
                     "Ensure config/development.js is existing and contains a valid app config!");
        }
        return Ext.appConfig;
    },


    /**
     * Returns the html markup that contians the <script>
     * tags the browser needs to load to support socket.io and partial async content loading properly
     * @return {String} HTML markup
     */
    headScripts: function() {

        var appConfig = Ext.getAppConfig(),
            hostname = appConfig.hostname || 'localhost',
            ioPort = appConfig.ioPort || 1084,
            expressPort = appConfig.expressPort || 80;

        return '<!-- Initial <head> scripts rendered dynamically by Extode.renderInitHeadScripts() -->' +
               '<script type="text/javascript">window.Extode = {readyFns: []}; Extode.onReady = function(cb) { Extode.readyFns.push(cb); if (Extode._isReady) { Extode.isReady(); } };</script>' +
               '<script type="text/javascript" src="http://' + hostname + ':' + ioPort + '/socket.io/socket.io.js"></script>' +
               '<script type="text/javascript">Extode.socket = io.connect("http://' + hostname + ':' + ioPort + '/"); Extode.getSocket = function() { return Extode.socket }; </script>' +
               '<script type="text/javascript" src="http://' + hostname + ':' + expressPort + '/Extode/__PartialSupport__.js"></script>' +
               '<script type="text/javascript">Extode._isReady = false; Extode.isReady = function() { for (var i=0; i<Extode.readyFns.length; i++) { Extode.readyFns[i](); } Extode._isReady = true; Extode.readyFns = []; }; Extode.isReady();</script>'

    }
});

// Extode reference
global.Extode = Ext;