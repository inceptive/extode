/*!
 * Copyright(c) 2011 Aron Homberg and the extode Community.
 * http://extode.jsyn.de
 */
/*!
 * Extify - runs everywhere
 * 
 * High performance, ultra-minimal, opensource OOP javascript framework in style 
 * of Ext Core. Reimplements portions of the Ext Core 3.1 and Ext JS 4 API 
 * in a clean way. Extify is MIT licensed.
 *  
 * USED PORTIONS OF:
 * 
 * Ext Core Library 3.1
 * http://extjs.com/
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * 
 * MIT Licensed - http://extjs.com/license/mit.txt
 *
 * The MIT License
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

 
// Node JS is executing
if (typeof GLOBAL !== "undefined") {
    window = global = GLOBAL;
} else  if (typeof window !== "undefined") {
    window = global = GLOBAL = window;
} else {
    window = global = GLOBAL = window = this;
} 

 
/**
 * @class Ext
 * Ext core utilities and functions.
 * @singleton
 */
Ext = {

    enableLogging: true,
    USE_NATIVE_JSON : true,
    version: '4.0.0',
    frameworkName: 'Extify'
};


/**
 * Copies all the properties of config to obj.
 * @param {Object} obj The receiver of the properties
 * @param {Object} config The source of the properties
 * @param {Object} defaults A different object that will also be applied for default values
 * @return {Object} returns obj
 * @member Ext apply
 */
Ext.apply = function(o, c, defaults) {
    if(defaults){
        Ext.apply(o, defaults);
    }
    if(o && c && typeof c == 'object'){
        for(var p in c){
            if (true) {
                o[p] = c[p];
            }
        }
    }
    return o;
};

(function(){
    var toString = Object.prototype.toString;
    
    
    Ext.apply(Ext, {

         
        /**
         * @cfg {Boolean} enableLogging Controls, if log messages will be shown or not (default: false)
         */
        enableLogging: true,
        
        
        /**
         * @type {String} LOGLEVEL_WARN Logs only warning messages 
         */
        LOGLEVEL_WARN: 'warn',
        
        
        /**
         * @type {String} LOGLEVEL_INFO Logs all appearing messages
         */
        LOGLEVEL_INFO: 'info',
        
        
        /**
         * @type {String} LOGLEVEL_DEBUG Logs warning and debug messages
         */
        LOGLEVEL_DEBUG: 'debug',
        
        
        /**
         * Method for logging
         *      
         * @param {Mixed} logMessage Message to log (Can be array)
         * @param {String} severity  Severity role name
         * @return void
         */
        _log: function(logMessage) {
        
            var severity = Ext.LOGLEVEL_INFO, toLog = [];
            if (Ext.isDefined(arguments[1])) {
                severity = arguments[1];
            }
            toLog.push(
                Ext.frameworkName + '[' + severity + ']:'
            );
            
            for (var i=0; i<logMessage.length; i++) {
                toLog.push(logMessage[i]);
            }
            
            // Only log if debugging is enabled
            if (Ext.enableLogging === true) {

                try {
                    console.log.apply(this, toLog);
                } catch (e) {
                    console.log(toLog);
                }
                
            }
        },
        log: function() { Ext._log(arguments, Ext.LOGLEVEL_DEBUG)},
        info: function() { Ext._log(arguments, Ext.LOGLEVEL_INFO)},
        debug: function() { Ext._log(arguments, Ext.LOGLEVEL_DEBUG)},
        warn: function() { Ext._log(arguments, Ext.LOGLEVEL_WARN)}
    });
     
    // global is a reference for the global scope.
    // We reference global methods here as shortcuts.
    global.log = Ext.log;
    global.warn = Ext.warn;
    global.debug = Ext.debug;
    global.dir = Ext.log;
    global.alert = Ext.warn;
    global.info = Ext.info;

        
    Ext.apply(Ext, {
    
        /**
         * Copies all the properties of config to obj if they don't already exist.
         * @param {Object} obj The receiver of the properties
         * @param {Object} config The source of the properties
         * @return {Object} returns obj
         */
        applyIf : function(o, c){
            if(o){
                for(var p in c){
                    if(!Ext.isDefined(o[p])){
                        o[p] = c[p];
                    }
                }
            }
            return o;
        },

        
        /**
         * <p>Extends one class to create a subclass and optionally overrides members with the passed literal. This method
         * also adds the function "override()" to the subclass that can be used to override members of the class.</p>
         * For example, to create a subclass of Ext GridPanel:
         * <pre><code>
MyGridPanel = Ext.extend(Ext.grid.GridPanel, {
    constructor: function(config) {

//      Create configuration for this Grid.
        var store = new Ext.data.Store({...});
        var colModel = new Ext.grid.ColumnModel({...});

//      Create a new config object containing our computed properties
//      *plus* whatever was in the config parameter.
        config = Ext.apply({
            store: store,
            colModel: colModel
        }, config);

        MyGridPanel.superclass.constructor.call(this, config);

//      Your postprocessing here
    },

    yourMethod: function() {
        // etc.
    }
});
</code></pre>
         *
         * <p>This function also supports a 3-argument call in which the subclass's constructor is
         * passed as an argument. In this form, the parameters are as follows:</p>
         * <div class="mdetail-params"><ul>
         * <li><code>subclass</code> : Function <div class="sub-desc">The subclass constructor.</div></li>
         * <li><code>superclass</code> : Function <div class="sub-desc">The constructor of class being extended</div></li>
         * <li><code>overrides</code> : Object <div class="sub-desc">A literal with members which are copied into the subclass's
         * prototype, and are therefore shared among all instances of the new class.</div></li>
         * </ul></div>
         *
         * @param {Function} superclass The constructor of class being extended.
         * @param {Object} overrides <p>A literal with members which are copied into the subclass's
         * prototype, and are therefore shared between all instances of the new class.</p>
         * <p>This may contain a special member named <tt><b>constructor</b></tt>. This is used
         * to define the constructor of the new class, and is returned. If this property is
         * <i>not</i> specified, a constructor is generated and returned which just calls the
         * superclass's constructor passing on its parameters.</p>
         * <p><b>It is essential that you call the superclass constructor in any provided constructor. See example code.</b></p>
         * @return {Function} The subclass constructor from the <code>overrides</code> parameter, or a generated one if not provided.
         */
        extend : function() {
            var io = function(o){
                for(var m in o){
                    if (this) {
                        this[m] = o[m];
                    }
                }
            };
            var oc = Object.prototype.constructor;

            return function(sb, sp, overrides){
                
                // If sb or sp is undefined
                if (!Ext.isDefined(sb) || !Ext.isDefined(sp)) {
                    return null;
                }

                if(Ext.isObject(sp)){
                    overrides = sp;
                    sp = sb;
                    sb = overrides.constructor != oc ? overrides.constructor : function(){sp.apply(this, arguments);};
                }
                var F = function(){},
                    sbp,
                    spp = sp.prototype;

                F.prototype = spp;
                sbp = sb.prototype = new F();
                sbp.constructor=sb;
                
                sb.superclass=spp;
                if(spp.constructor == oc){
                    spp.constructor=sp;
                }
                sb.override = function(o){
                    Ext.override(sb, o);
                };
                sbp.superclass = sbp.supr = (function(){
                    return spp;
                });
                sbp.override = io;
                Ext.override(sb, overrides);
                sb.extend = function(o){return Ext.extend(sb, o);};
                
                
                return sb;
            };
        }(),
        
        
        /**
         * Defines a class prototype in Ext JS 4-style.
         * 
         * Currently supported:
         * - singleton
         * - extend
         * - statics
         * - mixins (multiple inheritance)  
         * - implicit naming (given string name references class constructor function)
         * - callback after define
         * - alias name
         * - auto dependency check -> but no autoloading! (antipattern!)  
         * 
         *  Example of old style Ext JS 3 (also works):
         *                    
         *  var lala = Ext.extend(Object, {
         *    muah1: true  
         *  });
         *  new lala();
         *  
         *  // You can now use:
         *           
         *  Ext.define("lulu", {
         *     haha: 15
         *  });
         *                   
         *  Ext.define("lala2.lala", {
         *      muah: false,
         *      extend: 'lala',         
         *      mixins: ['lulu'],
         *      statics: {
         *          uha: true
         *      },
         *      alias: 'another.classname',
         *      singleton: true                  
         *  }, function(classRef) {
         *      console.debug('yeah, class was defined!');
         *  });
         *  
         *  Ext.log(another.classname;                                        
         *  
         * @param {String} className Name of the class (even with namespaces)
         * @param {Object} classDef Class definition 
         * @param {Function} callback Callback function called when class is defined
         * @return {Function} Class proto constructor function                                                  
         */                          
        define: function() {
        
            var nameOfClass = arguments[0],
                classDef = arguments[1],
                cb = arguments[2],
                superClassRef = Object, i, 
                mName = null, currentMixRef = {},
                clsProto;

            if (!Ext.isDefined(nameOfClass)) {
                throw "Error: Please specify a class name when using Ext.define()!";
            }
            
            if (!Ext.isDefined(classDef)) {
                throw "Error: Please provide a class definition object for class '" + nameOfClass + "' when using Ext.define()!";
            }
            
            if (!Ext.isDefined(cb)) {
                cb = function() {};
            }
                
            // Dereference extend class
            if (!Ext.isDefined(classDef.extend)) {
                classDef.extend = 'Ext.Class';
            }
            
            if (Ext.isDefined(classDef.extend)) {
                var clsNotPresentErr = "Error: The class '" + classDef.extend + "' the class '" + nameOfClass + "' should extend from isn't present.";
                try {
                    superClassRef = eval("(" + classDef.extend + ")");

                    if (!Ext.isDefined(superClassRef)) {
                        throw clsNotPresentErr;
                    }

                } catch (e) {
                    throw clsNotPresentErr;
                }
            }
            
            // Handle multiple inheritance, mixins
            if (Ext.isDefined(classDef.mixins) && Ext.isArray(classDef.mixins)) {
                for (i=0; i<classDef.mixins.length; i++) {

                    try {
                        currentMixRef = eval("(" + classDef.mixins[i] + ")");
                    } catch(e) {
                        throw "Error: The class '" + classDef.mixins[i] + "' you want to mixin in '" + nameOfClass + "' is not present.";
                    }
                    
                    // Apply prototype objects of mixins onto classDef by native order
                    if (Ext.isDefined(currentMixRef) && Ext.isFunction(currentMixRef)) {
                        
                        delete currentMixRef.prototype.constructor;
                        Ext.apply(classDef, currentMixRef.prototype);
                    }
                }  
            }

            // Annotate the method name to any function
            // to allow callParent() to know their names.
            for (mName in classDef) {
                if (Ext.isFunction(classDef[mName])) {
                    //console.debug("Annotating", classDef[mName], mName);
                    classDef[mName]['$name'] = mName;
                }
            }
            
            // Extend the extending class of object
            clsProto = Ext.extend(superClassRef, classDef);
            
            // Annotate the superclass on instance level
            clsProto.prototype['$superclass'] = superClassRef;
            
            if (clsProto == null) {
                throw "The class definition of class named " + nameOfClass + " failed. Maybe the inheritance function references are undefined.";
            } 
            
            // If singleton, instantiate
            if (Ext.isDefined(classDef.singleton) && 
                classDef.singleton === true) {
                clsProto = new clsProto();
            }       

            // Apply all statics statically
            for (name in classDef.statics) {

                // Bind the class def to the static methods so they can even work
                // with this.* on prototype level ;-)
                clsProto[name] = Ext.Function.bind(classDef.statics[name], clsProto);
            }


            // Namespacing with references
            var nameRef = function(name, ref) {
            
                var scope, 
                    splits = name.split("."),
                    len = splits.length;
                
                if (len == 1) {
                    scope = window[splits[0]] = ref;
                    return scope;
                } else {
                    scope = window[splits[0]] = window[splits[0]] || {};
                }   
                
                var splitIter = 1;
                Ext.each(splits.slice(1), function(nameSplit) {
                
                    splitIter++;
                    
                    if (len == splitIter) {
                        scope = scope[nameSplit] = ref;
                    } else {
                        scope = scope[nameSplit] = scope[nameSplit] || {};
                    }
                });
                return scope;
            };
            
            // Reference the given class name with the proto
            nameRef(nameOfClass, clsProto);     
            
            // Assign alias name if given
            if (Ext.isDefined(classDef.alias)) {
                nameRef(classDef.alias, clsProto);
            }      
            
            // Call after-create callback function
            cb(clsProto);
            
            // Return reference to class proto constructor
            return clsProto;
        },
        

        /**
         * Creates an instance of the named class with an instance overlay
         * to use.
         * 
         * @param {String} className Name of the class (even with namespaces)
         * @param {Object} instOverlay Overlay configuration for the instance 
         * @return {Object} Class instance
         */
        create: function(className, instOverlay) {
            var splits = className.split("."),
                len = splits.length, i, prevRef = window, inst;

            for (i=0; i<len; i++) {
                prevRef = prevRef[splits[i]];

                if (!Ext.isDefined(prevRef) || prevRef == null) {
                    throw "The class you want to instantiate is not defined: " + className;  
                }
            }

            if (!Ext.isDefined(instOverlay) || !Ext.isObject(instOverlay)) {
                instOverlay = {}
            }

            if (!Ext.isFunction(prevRef))  {
                throw "The given class name " + className + " is not of type function (not a constructor!)";
            }            
            return new prevRef(instOverlay);
        },
        
        
        /**
         * Iterates an array calling the supplied function.
         * @param {Array/NodeList/Mixed} array The array to be iterated. If this
         * argument is not really an array, the supplied function is called once.
         * @param {Function} fn The function to be called with each item. If the
         * supplied function returns false, iteration stops and this method returns
         * the current <code>index</code>. This function is called with
         * the following arguments:
         * <div class="mdetail-params"><ul>
         * <li><code>item</code> : <i>Mixed</i>
         * <div class="sub-desc">The item at the current <code>index</code>
         * in the passed <code>array</code></div></li>
         * <li><code>index</code> : <i>Number</i>
         * <div class="sub-desc">The current index within the array</div></li>
         * <li><code>allItems</code> : <i>Array</i>
         * <div class="sub-desc">The <code>array</code> passed as the first
         * argument to <code>Ext.each</code>.</div></li>
         * </ul></div>
         * @param {Object} scope The scope (<code>this</code> reference) in which the specified function is executed.
         * Defaults to the <code>item</code> at the current <code>index</code>
         * within the passed <code>array</code>.
         * @return See description for the fn parameter.
         */
        each : function(array, fn, scope){
            if(Ext.isEmpty(array, true)){
                return;
            }
            if(Ext.isPrimitive(array)){
                array = [array];
            }
            
            // Todo: Extanium recursion fix
            for(var i = 0, len = array.length; i < len; i++){
                if(fn.call(scope || array[i], array[i], i, array) === false){
                    return i;
                };
            }
        },
        
        
        /**
         * Adds a list of functions to the prototype of an existing class, overwriting any existing methods with the same name.
         * Usage:<pre><code>
Ext.override(MyClass, {
    newMethod1: function(){
        // etc.
    },
    newMethod2: function(foo){
        // etc.
    }
});
</code></pre>
         * @param {Object} origclass The class to override
         * @param {Object} overrides The list of functions to add to origClass.  This should be specified as an object literal
         * containing one or more methods.
         * @method override
         */
        override : function(origclass, overrides){
            if(overrides){
                var p = origclass.prototype;
                Ext.apply(p, overrides);
            }
        },
        
        
        /**
         * Creates namespaces to be used for scoping variables and classes so that they are not global.
         * Specifying the last node of a namespace implicitly creates all other nodes. Usage:
         * <pre><code>
Ext.namespace('Company', 'Company.data');
Ext.namespace('Company.data'); // equivalent and preferable to above syntax
Company.Widget = function() { ... }
Company.data.CustomStore = function(config) { ... }
</code></pre>
         * @param {String} namespace1
         * @param {String} namespace2
         * @param {String} etc
         * @return {Object} The namespace object. (If multiple arguments are passed, this will be the last namespace created)
         * @method namespace
         */
        namespace : function(){
            var o, d;
            
            // Todo: Extanium recursion fix
            Ext.each(arguments, function(v) {
                d = v.split(".");
                o = window[d[0]] = window[d[0]] || {};
                Ext.each(d.slice(1), function(v2){
                    o = o[v2] = o[v2] || {};
                });
            });
            return o;
        },
        

        /**
         * Appends content to the query string of a URL, handling logic for whether to place
         * a question mark or ampersand.
         * @param {String} url The URL to append to.
         * @param {String} s The content to append to the URL.
         * @return (String) The resulting URL
         */
        urlAppend : function(url, s){
            if(!Ext.isEmpty(s)){
                return url + (url.indexOf('?') === -1 ? '?' : '&') + s;
            }
            return url;
        },

        
        isIterable : function(v){
            //check for array or arguments
            if(Ext.isArray(v) || v.callee){
                return true;
            }
        },
        
        
        
        /**
         * Iterates either the elements in an array, or each of the properties in an object.
         * <b>Note</b>: If you are only iterating arrays, it is better to call {@link #each}.
         * @param {Object/Array} object The object or array to be iterated
         * @param {Function} fn The function to be called for each iteration.
         * The iteration will stop if the supplied function returns false, or
         * all array elements / object properties have been covered. The signature
         * varies depending on the type of object being interated:
         * <div class="mdetail-params"><ul>
         * <li>Arrays : <tt>(Object item, Number index, Array allItems)</tt>
         * <div class="sub-desc">
         * When iterating an array, the supplied function is called with each item.</div></li>
         * <li>Objects : <tt>(String key, Object value, Object)</tt>
         * <div class="sub-desc">
         * When iterating an object, the supplied function is called with each key-value pair in
         * the object, and the iterated object</div></li>
         * </ul></div>
         * @param {Object} scope The scope (<code>this</code> reference) in which the specified function is executed. Defaults to
         * the <code>object</code> being iterated.
         */
        iterate : function(obj, fn, scope){
            if(Ext.isEmpty(obj)){
                return;
            }
            if(Ext.isIterable(obj)){
                Ext.each(obj, fn, scope);
                return;
            }else if(Ext.isObject(obj)){
                for(var prop in obj){
                    if(obj.hasOwnProperty(prop)){
                        if(fn.call(scope || obj, prop, obj[prop], obj) === false){
                            return;
                        };
                    }
                }
            }
        },
      
        
        /**
         * Converts any iterable (numeric indices and a length property) into a true array
         * Don't use this on strings. IE doesn't support "abc"[0] which this implementation depends on.
         * For strings, use this instead: "abc".match(/./g) => [a,b,c];
         * @param {Iterable} the iterable object to be turned into a true Array.
         * @return (Array) array
         */
        toArray : function(){
             return function(a, i, j){
                     return Array.prototype.slice.call(a, i || 0, j || a.length);
                 };
        }(),

        
        /**
         * <p>Returns true if the passed value is empty.</p>
         * <p>The value is deemed to be empty if it is<div class="mdetail-params"><ul>
         * <li>null</li>
         * <li>undefined</li>
         * <li>an empty array</li>
         * <li>a zero length string (Unless the <tt>allowBlank</tt> parameter is <tt>true</tt>)</li>
         * </ul></div>
         * @param {Mixed} value The value to test
         * @param {Boolean} allowBlank (optional) true to allow empty strings (defaults to false)
         * @return {Boolean}
         */
        isEmpty : function(v, allowBlank){
            return v === null || v === undefined || ((Ext.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
        },

        
        /**
         * Returns true if the passed value is a JavaScript array, otherwise false.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isArray : function(v){
            return toString.apply(v) === '[object Array]';
        },
        
        
        /**
         * Returns true if the passed object is a JavaScript date object, otherwise false.
         * @param {Object} object The object to test
         * @return {Boolean}
         */
        isDate : function(v){
            return toString.apply(v) === '[object Date]';
        },
        
        
        /**
         * Returns true if the passed value is a JavaScript Object, otherwise false.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isObject : function(v){
            return !!v && Object.prototype.toString.call(v) === '[object Object]';
        },
        
        
        /**
         * Returns true if the passed value is a JavaScript 'primitive', a string, number or boolean.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isPrimitive : function(v){
            return Ext.isString(v) || Ext.isNumber(v) || Ext.isBoolean(v);
        },
        
        
        /**
         * Returns true if the passed value is a JavaScript Function, otherwise false.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isFunction : function(v){
            return toString.apply(v) === '[object Function]';
        },
        
        
        /**
         * Returns true if the passed value is a number. Returns false for non-finite numbers.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isNumber : function(v){
            return typeof v === 'number' && isFinite(v);
        },
        
        
        /**
         * Returns true if the passed value is a string.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isString : function(v){
            return typeof v === 'string';
        },
        
        
        /**
         * Returns true if the passed value is a boolean.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isBoolean : function(v){
            return typeof v === 'boolean';
        },
        
        
        /**
         * Returns true if the passed value is not undefined.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isDefined : function(v){
            return typeof v !== 'undefined';
        },


        /**
         * Returns a unique Ext id
         * @return {String}
         */
        idSequence: 0,
        id: function() {
            Ext.idSequence++;
            return "ext-" + Ext.idSequence;
        }
    });
})();

// Shorten reference
Ext.ns = Ext.namespace;
Ext.ns("Ext.util", "Ext.lib", "Ext.data");
/**
 * @class Ext.util.Serializable
 * Implements a method to serialize data transfer objects
 */
Ext.define('Ext.util.Serializable', {


    extend: 'Object',
    
    
    /**
     * Encodes the object to JSON
     * @return {String}
     */
    serialize: function() {
        return Ext.encode(this);
    }
});/**
 * @class Ext.util.ClassObservable
 * 
 * Mixin class to support event handling inside of classes.
 */
Ext.define("Ext.util.ClassObservable", {

    
    extend: 'Object',
    
    
    /**
     * Array holding all known event names
     * @private     
     */         
    eventNames: [],
    
    
    /**
     * Object map holding all listener functions
     * referenced by name      
     * @private     
     */         
    listenersMap: {},
    
    
    /**
     * @cfg {Object} listeners Listeners object containing event name to handler function map
     */
    listeners: {},


    /**
     * Processes the this.listeners object maybe containing
     * event handler methods.
     * @return void
     */
    processListenersObject: function() {
        for (eventName in this.listeners) {
            this.on(eventName, this.listeners[eventName]);
        }
    },

    
    /**
     * Fires a named event
     * 
     * @param {String} evtName Name of the event to fire
     * @param {Mixed] ... As many additional params as you want to transmit to the event handler.
     * @return void                   
     */         
    fireEvent: function(evtName /*, ...*/) {
    
        var shouldRemoveListener = false, currentAdditionalOpts = null,
            delayListenerExecution = false, bufferListenerExecution = false,
            targetListenerCheck = false;
        
        if (Ext.Array.indexOf(this.eventNames, evtName) < 0) {
            throw "The event with name " + evtName + " cannot be fired. " +
                  "It wasn't added before. (@see addEvents(...)).";
        }

        var newArgs = [];
        for (index in arguments) {
            if (index > 0) {
                newArgs.push(arguments[index]);
            }
        }
    
        // Call any registered listener directly with the given arguments
        for (var i=0; i<this.listenersMap[evtName].length; i++) {
            
            if (Ext.isDefined(this.listenersMap[evtName][i])) {
                
                // Temporary variables for special listener
                // option handling
                shouldRemoveListener = false;
                delayListenerExecution = false;
                bufferListenerExecution = false;
                targetListenerCheck = false;
                currentAdditionalOpts = this.listenersMap[evtName][i].additionalOpts; 
                
                // Handle additional options
                if (Ext.isDefined(currentAdditionalOpts) 
                    && Ext.isObject(currentAdditionalOpts)) {
                    
                    
                    // Check for "single" option
                    if (Ext.isDefined(currentAdditionalOpts.single) &&
                        currentAdditionalOpts.single === true) {
                        shouldRemoveListener = true;
                    }
                    
                    // Check for "delay" option
                    if (Ext.isDefined(currentAdditionalOpts.delay) &&
                        Ext.isNumber(currentAdditionalOpts.delay)) {
                        delayListenerExecution = true;
                    }
                    
                    // Check for "buffer" option
                    if (Ext.isDefined(currentAdditionalOpts.buffer) &&
                        Ext.isNumber(currentAdditionalOpts.buffer)) {
                        bufferListenerExecution = true;
                    }
                    
                    // Check for "target" option
                    if (Ext.isDefined(currentAdditionalOpts.target) &&
                        Ext.isNumber(currentAdditionalOpts.target)) {
                        targetListenerCheck = true;
                    }
                }
                
                // Do not execute if listener is marked as single executible
                // and it was marked (so it was already executed)
                if (Ext.isDefined(this.listenersMap[evtName][i].$singleWasExecuted)) {
                    return;
                }
                
                // If "target" is given we need to check if "this" 
                // equals the target instance. The listener should only
                // be called on this instance. This is useful when an
                // event is relayed
                if (targetListenerCheck === true) {
                    if (currentAdditionalOpts.target !== this) {
                        return;
                    }
                }
                
                if (delayListenerExecution === true) {
                
                    // Delay the execution by currentAdditionalOpts.delay
                    setTimeout(Ext.Function.bind(function() {
                        this.listenersMap[evtName][i].apply(this, newArgs);
                    }, this), currentAdditionalOpts.delay);
                    
                } else if (bufferListenerExecution === true) {
                
                    // If buffer is set by date timestamp
                    // check against (stored timestamp + buffer ms - 
                    // current timestamp) > 0 execute
                    if (Ext.isDefined(this.listenersMap[evtName][i].$bufferTimestamp) &&
                        Ext.isDate(this.listenersMap[evtName][i].$bufferTimestamp)) {
                        
                        if (((this.listenersMap[evtName][i].$bufferTimestamp.getTime() + 
                             currentAdditionalOpts.buffer) - new Date().getTime()) > 0) {
                             
                            // Execute the buffered function and reset buffer flag
                            this.listenersMap[evtName][i].apply(this, newArgs);
                            
                            // Reset buffer flag
                            delete this.listenersMap[evtName][i].$bufferTimestamp;
                        }
                        
                    } else {
                        
                        // Set current timestamp of time when the buffer was started
                        this.listenersMap[evtName][i].$bufferTimestamp = new Date();
                        return;
                    }
                    
                } else {
                
                    // Standard direct execution
                    this.listenersMap[evtName][i].apply(this, newArgs);
                }
                
                // Remove listener if single option was enabled
                if (shouldRemoveListener) {
                    this.listenersMap[evtName][i].$singleWasExecuted = true;
                }
            }
        }
    },
    
    
    /**
     * Fires a named event.
     * Shortcut for fireEvent()
     * 
     * @param {String} evtName Name of the event to fire
     * @param {Mixed] ... As many additional params as you want to transmit to the event handler.
     * @return void                   
     */
    trigger: function(evtName /*, ...*/) {
        this.fireEvent.apply(this, arguments);
    },

    
    /**
     * Registers event names
     * 
     * @param {String} ... As many event names as you want to register
     * @return void               
     */         
    addEvents: function(/*...*/) {

        if (Ext.isDefined(arguments[0]) && Ext.isArray(arguments[0])) {
            throw "Don't use array as input. Just provide a lot of event names in sequence!";
        }
        
        // Create a listener array in the 
        // listeners map for any event name
        for (var i=0; i<arguments.length; i++) {
        
            // Push to known event names list
            this.eventNames.push(arguments[i]);
            
            // Create named listener stack
            this.listenersMap[arguments[i]] = [];
        }    
    },
    
   
    /**
     * Registers the given event handler function 
     * for the given event name. If the event gets fired
     * all registered event handlers will be called.
     * 
     * @param {String} evtName Name of the event
     * @param {Function} fn Function to register      
     * @param {Object} additionalOpts Additional options                    
     * @return void
     */               
    addListener: function(evtName, fn, additionalOpts) {

        var regListener = function(evtName, fn, additionalOpts) {
            
            // Additional opts
            fn.additionalOpts = additionalOpts;
            
            // Add to the listeners map
            this.listenersMap[evtName].push(fn);
        };
         
        try {
            regListener.call(this, evtName, fn, additionalOpts);
        } catch (e) {
        
            // Automatically add the event 
            this.addEvents(evtName);
            regListener.call(this, evtName, fn, additionalOpts);
        }
    },
    
    
    /**
     * Registers the given event handler function 
     * for the given event name. If the event gets fired
     * all registered event handlers will be called.
     * Shortcut for addListener()
     * 
     * @param {String} evtName Name of the event
     * @param {Function} fn Function to register        
     * @param {Object} additionalOpts Additional options                  
     * @return void
     */ 
    on: function(evtName, fn, additionalOpts) {
    
        // Call core method for that...
        return this.addListener(evtName, fn, additionalOpts);
    },


    /**
     * Registers the given event handler function 
     * for the given event name. If the event gets fired
     * all registered event handlers will be called.
     * Shortcut for addListener() 
     *
     * @param {String} evtName Name of the event
     * @param {Function} fn Function to register  
     * @param {Object} additionalOpts Additional options                        
     * @return void
     */ 
    bind: function(evtName, fn, additionalOpts) {
    
        // Call core method for that...
        return this.addListener(evtName, fn, additionalOpts);
    },
    
    
    /**
     * Relays events to the given component instance
     * so they get fired on the given class instance too.     
     * 
     * @param {Object} clsInst Class instance object (Mixin: Ext.util.ClassObservable)
     * @param {Array} eventNames Events to relay from source class instance               
     * @return void    
     */         
    relayEvents: function(clsInst, eventNames) {
        
        var me = this,
            execScope = null;

        if (Ext.isDefined(clsInst.addEvents) &&
            Ext.isFunction(clsInst.addEvents)) {
            
            me.addEvents(eventNames);

            // For each event of the clsInst to attach
            // register a local listener which fires the
            // local, relay event 
            for (var i=0; i<eventNames.length; i++) {

                execScope = {};
                execScope.me = me;
                execScope._eventName = eventNames[i];
                execScope._clsInst = clsInst;

                with (execScope) {

                    _clsInst.on(_eventName, function() {

                        debug("Relayed event EXPERIMENTAL fired:");
                        debug(_eventName);
                        debug("Relayed event EXPERIMENTAL fired:");

                        me.fireEvent(_eventName, arguments);
                    });
                }
            }    
        }
    },
    

    /**
     * Removes one or many listeners from the instance depending on the
     * call parameters.
     *
     * // Removes all listeners
     * removeListener() 
     *
     * // Removes all listeners named 'message'
     * removeListener('message')
     *
     * // Remove the specific listener function
     * removeListener('message', this.onMessage)
     *
     * @param {String} targetEvtName Name of the event to remove [Optional]
     * @param {Function} handlerFn Specific handler function previously attached [Optional]
     * @return void
     */
    removeListener: function(targetEvtName, handlerFn) {
        
        var eventName, i;
        for (eventName in this.listenersMap) {
            for (i=0; i<this.listenersMap[eventName].length; i++) {
                
                if (Ext.isDefined(targetEvtName) && Ext.isString(targetEvtName)) {
                    
                    // If name is given, only remove if name matches
                    if (targetEvtName === eventName) {
                        
                        // If handler given also check for handler matching
                        if (Ext.isDefined(handlerFn) && Ext.isFunction(handlerFn)) {
                        
                            // Check for handler
                            if (this.listenersMap[eventName][i] === handlerFn) {
                                this.listenersMap[eventName] = Ext.Array.remove(this.listenersMap[eventName], this.listenersMap[eventName][i]);
                            }
                        
                        } else {
                        
                            // No handler given? Remove all listeners with matching name
                            this.listenersMap[eventName] = Ext.Array.remove(this.listenersMap[eventName], this.listenersMap[eventName][i]);
                        }
                    }
                    
                } else {
                    
                    // Remove all handlers if targetEvtName is not a String or not defined
                    this.listenersMap[eventName] = Ext.Array.remove(this.listenersMap[eventName], this.listenersMap[eventName][i]);
                }
            }
        }
    },
    

    /**
     * Removes one or many listeners from the instance depending on the
     * call parameters.
     * Shortcut for removeListener()
     *
     * // Removes all listeners
     * removeListener() 
     *
     * // Removes all listeners named 'message'
     * removeListener('message')
     *
     * // Remove the specific listener function
     * removeListener('message', this.onMessage)
     *
     * @param {String} targetEvtName Name of the event to remove [Optional]
     * @param {Function} handlerFn Specific handler function previously attached [Optional]
     * @return void
     */
    un: function(fn) {
        this.removeListener.apply(this, arguments);
    },
    

    /**
     * Removes one or many listeners from the instance depending on the
     * call parameters.
     * Shortcut for removeListener()
     *
     * // Removes all listeners
     * removeListener() 
     *
     * // Removes all listeners named 'message'
     * removeListener('message')
     *
     * // Remove the specific listener function
     * removeListener('message', this.onMessage)
     *
     * @param {String} targetEvtName Name of the event to remove [Optional]
     * @param {Function} handlerFn Specific handler function previously attached [Optional]
     * @return void
     */
    unbind: function(fn) {
        this.removeListener.apply(this, arguments);
    }
});
/**
 * @class Ext.Class
 * 
 * Base class of all other classes specialized for instantiation
 * and dynamic configuration.   
 */
Ext.define('Ext.Class', {

    mixins: ['Ext.util.ClassObservable', 'Ext.util.Serializable'],
    
    
    extend: 'Object',


    /**
     * @cfg {String} id Id of the component _instance_
     */
    id: null,


    /**
     * Gets called on instance creation.
     * Maps the given config object onto the
     * local object instance if given.          
     *                    
     * @param {Object} cfg Optional overlay config     
     * @private
     */         
    constructor: function(/*{Object} cfg*/) {
    
        if (Ext.isDefined(arguments[0]) &&
            Ext.isObject(arguments[0])) {
           
            // Apply config object onto local instance
            Ext.apply(this, arguments[0]);
        }

        // Register in component manager with id
        // If this.id is null, a id will be auto-generated (sequence)
        Ext.Instances.push(this);

        // Process Ext.util.Observable listeners object
        // of this.listeners
        this.processListenersObject();
    },
    
    
    /**
     * Calls the parent method of this class
     *
     * @param {Array} args Arguments to be called with
     * @retrun void
     */
    callParent: function(args) {
        
        var methodCallerRef = this.callParent.caller;

        if (!Ext.isDefined(methodCallerRef)) {
            throw "callParent() failed. Caller not found.";
        }
        
        if (!Ext.isDefined(this.constructor.prototype.$superclass.prototype)) {
            throw "callParent() failed. There is no superclass that could be referred to.";
        }
        
        if (!Ext.isDefined(this.constructor.prototype.$superclass.prototype[methodCallerRef.$name]) || 
            !Ext.isFunction(this.constructor.prototype.$superclass.prototype[methodCallerRef.$name])) {
             throw "callParent() failed. There is no parent method (function) named " + methodCallerRef.$name + " in superclass.";
        } else {
            this.constructor.prototype.$superclass.prototype[methodCallerRef.$name].apply(this, args || []);
        }
    }
}, function() {
    
    // Create the Instances array if not existing
    if (!Ext.isDefined(Ext.Instances)) {
        Ext.Instances = [];
    }
});
/**
 * Prototype extensions for function
 * @class Function
 */ 
Ext.apply(Function.prototype, {


    /**
     * Creates an interceptor function. The passed function is called before the original one. If it returns false,
     * the original one is not called. The resulting function returns the results of the original function.
     * The passed function is called with the parameters of the original function. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

sayHi('Fred'); // alerts "Hi, Fred"

// create a new function that validates input without
// directly modifying the original function:
var sayHiToFriend = sayHi.createInterceptor(function(name){
    return name == 'Brian';
});

sayHiToFriend('Fred');  // no alert
sayHiToFriend('Brian'); // alerts "Hi, Brian"
</code></pre>
     * @param {Function} fcn The function to call before the original
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the passed function is executed.
     * <b>If omitted, defaults to the scope in which the original function is called or the browser window.</b>
     * @return {Function} The new function
     */
    createInterceptor : function(fcn, scope){
        var method = this;
        return !Ext.isFunction(fcn) ?
                this :
                function() {
                    var me = this,
                        args = arguments;
                    fcn.target = me;
                    fcn.method = method;
                    return (fcn.apply(scope || me || window, args) !== false) ?
                            method.apply(me || window, args) :
                            null;
                };
    },


    /**
     * Creates a callback that passes arguments[0], arguments[1], arguments[2], ...
     * Call directly on any function. Example: <code>myFunction.createCallback(arg1, arg2)</code>
     * Will create a function that is bound to those 2 args. <b>If a specific scope is required in the
     * callback, use {@link #createDelegate} instead.</b> The function returned by createCallback always
     * executes in the window scope.
     * <p>This method is required when you want to pass arguments to a callback function.  If no arguments
     * are needed, you can simply pass a reference to the function as a callback (e.g., callback: myFn).
     * However, if you tried to pass a function with arguments (e.g., callback: myFn(arg1, arg2)) the function
     * would simply execute immediately when the code is parsed. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

// clicking the button alerts "Hi, Fred"
new Ext.Button({
    text: 'Say Hi',
    renderTo: Ext.getBody(),
    handler: sayHi.createCallback('Fred')
});
</code></pre>
     * @return {Function} The new function
    */
    createCallback : function(/*args...*/){
        var args = arguments,
            method = this;
        return function() {
            return method.apply(window, args);
        };
    },


    /**
     * Creates a delegate (callback) that sets the scope to obj.
     * Call directly on any function. Example: <code>this.myFunction.createDelegate(this, [arg1, arg2])</code>
     * Will create a function that is automatically scoped to obj so that the <tt>this</tt> variable inside the
     * callback points to obj. Example usage:
     * <pre><code>
var sayHi = function(name){
    // Note this use of "this.text" here.  This function expects to
    // execute within a scope that contains a text property.  In this
    // example, the "this" variable is pointing to the btn object that
    // was passed in createDelegate below.
    alert('Hi, ' + name + '. You clicked the "' + this.text + '" button.');
}

var btn = new Ext.Button({
    text: 'Say Hi',
    renderTo: Ext.getBody()
});

// This callback will execute in the scope of the
// button instance. Clicking the button alerts
// "Hi, Fred. You clicked the "Say Hi" button."
btn.on('click', sayHi.createDelegate(btn, ['Fred']));
</code></pre>
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
     * <b>If omitted, defaults to the browser window.</b>
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Function} The new function
     */
    createDelegate : function(obj, args, appendArgs){
        var method = this;
        return function() {
            var callArgs = args || arguments;
            if (appendArgs === true){
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }else if (Ext.isNumber(appendArgs)){
                callArgs = Array.prototype.slice.call(arguments, 0);                 var applyArgs = [appendArgs, 0].concat(args); 
                Array.prototype.splice.apply(callArgs, applyArgs);             }
            return method.apply(obj || window, callArgs);
        };
    },


    /**
     * Calls this function after the number of millseconds specified, optionally in a specific scope. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

// executes immediately:
sayHi('Fred');

// executes after 2 seconds:
sayHi.defer(2000, this, ['Fred']);

// this syntax is sometimes useful for deferring
// execution of an anonymous function:
(function(){
    alert('Anonymous');
}).defer(100);
</code></pre>
     * @param {Number} millis The number of milliseconds for the setTimeout call (if less than or equal to 0 the function is executed immediately)
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
     * <b>If omitted, defaults to the browser window.</b>
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Number} The timeout id that can be used with clearTimeout
     */
    defer : function(millis, obj, args, appendArgs){
        var fn = this.createDelegate(obj, args, appendArgs);
        if(millis > 0){
            return setTimeout(fn, millis);
        }
        fn();
        return 0;
    }
});


/**
 * @class Ext.Function
 * @singleton 
 * 
 * Singleton class as helper for working with functions    
 */ 
Ext.define("Ext.Function", {

    singleton: true,
   
   
    /**
     *
     * UNTESTED
     *               
     * Creates an interceptor function. The passed function is called before the original one. If it returns false,
     * the original one is not called. The resulting function returns the results of the original function.
     * The passed function is called with the parameters of the original function. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

sayHi('Fred'); // alerts "Hi, Fred"

// create a new function that validates input without
// directly modifying the original function:
var sayHiToFriend = Ext.Function.createInterceptor(sayHi, function(name){
    return name == 'Brian';
});

sayHiToFriend('Fred');  // no alert
sayHiToFriend('Brian'); // alerts "Hi, Brian"
</code></pre>                                          
     * @param {Function} fn The function to work with
     * @param {Function} fcn The function to call before the original
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the passed function is executed.
     * <b>If omitted, defaults to the scope in which the original function is called or the browser window.</b>
     * @return {Function} The new function
     */
    createInterceptor : function(fn, fcn, scope){
        var method = fn;
        return !Ext.isFunction(fcn) ?
                this :
                function() {
                    var me = this,
                        args = arguments;
                    fcn.target = me;
                    fcn.method = method;
                    return (fcn.apply(scope || me || window, args) !== false) ?
                            method.apply(me || window, args) :
                            null;
                };
    },


    /**
     *
     * UNTESTED
     *     
     * Creates a callback that passes arguments[0], arguments[1], arguments[2], ...
     * Call directly on any function. Example: <code>Ext.Function.createCallback(myFunction, arg1, arg2)</code>
     * Will create a function that is bound to those 2 args. <b>If a specific scope is required in the
     * callback, use {@link #createDelegate} instead.</b> The function returned by createCallback always
     * executes in the window scope.
     * <p>This method is required when you want to pass arguments to a callback function.  If no arguments
     * are needed, you can simply pass a reference to the function as a callback (e.g., callback: myFn).
     * However, if you tried to pass a function with arguments (e.g., callback: myFn(arg1, arg2)) the function
     * would simply execute immediately when the code is parsed. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

// clicking the button alerts "Hi, Fred"
new Ext.Button({
    text: 'Say Hi',
    renderTo: Ext.getBody(),
    handler: Ext.Function.createCallback(sayHi, 'Fred')
});
</code></pre>                                        
     * @param {Function} fn The function to work with
     * @return {Function} The new function
    */
    createCallback : function(fn /*, args...*/){
        var args = Array.prototype.slice.call(arguments, 1);
            method = fn;
        return function() {
            return method.apply(window, args);
        };
    },


    /**
     *
     * UNTESTED
     *     
     * Creates a delegate (callback) that sets the scope to obj.
     * Call directly on any function. Example: <code>this.myFunction.createDelegate(this, [arg1, arg2])</code>
     * Will create a function that is automatically scoped to obj so that the <tt>this</tt> variable inside the
     * callback points to obj. Example usage:
     * <pre><code>
var sayHi = function(name){
    // Note this use of "this.text" here.  This function expects to
    // execute within a scope that contains a text property.  In this
    // example, the "this" variable is pointing to the btn object that
    // was passed in createDelegate below.
    alert('Hi, ' + name + '. You clicked the "' + this.text + '" button.');
}

var btn = new Ext.Button({
    text: 'Say Hi',
    renderTo: Ext.getBody()
});

// This callback will execute in the scope of the
// button instance. Clicking the button alerts
// "Hi, Fred. You clicked the "Say Hi" button."
btn.on('click', Ext.Function.createDelegate(sayHi, btn, ['Fred']));
</code></pre>
     * @param {Function} fn The function to work with
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
     * <b>If omitted, defaults to the browser window.</b>
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Function} The new function
     */
    bind : function(fn, obj, args, appendArgs){
        var method = fn;
        return function() {
            var callArgs = args || arguments;
            if (appendArgs === true){
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }else if (Ext.isNumber(appendArgs)){
                callArgs = Array.prototype.slice.call(arguments, 0);                 
                var applyArgs = [appendArgs, 0].concat(args); 
                Array.prototype.splice.apply(callArgs, applyArgs);             
            }
            return method.apply(obj || window, callArgs);
        };
    },


    /**
     *
     * UNTESTED
     *     
     * Calls this function after the number of millseconds specified, optionally in a specific scope. Example usage:
<pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

// executes immediately:
sayHi('Fred');

// executes after 2 seconds:
Ext.Function.defer(sayHi, 2000, this, ['Fred']);

// this syntax is sometimes useful for deferring
// execution of an anonymous function:
(function(){
    alert('Anonymous');
}).defer(100);
</code></pre>
     * @param {Function} fn The function to work with
     * @param {Number} millis The number of milliseconds for the setTimeout call (if less than or equal to 0 the function is executed immediately)
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
     * <b>If omitted, defaults to the browser window.</b>
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Number} The timeout id that can be used with clearTimeout
     */
    defer : function(fn, millis, obj, args, appendArgs){
        var fn = Ext.Function.createDelegate(obj, args, appendArgs);
        if(millis > 0){
            return setTimeout(fn, millis);
        }
        fn();
        return 0;
    }
});/**
 * @class String
 * These functions are available on every String object.
 */
Ext.applyIf(String, {


    /**
     * Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens.  Each
     * token must be unique, and must increment in the format {0}, {1}, etc.  Example usage:
     * <pre><code>
var cls = 'my-class', text = 'Some text';
var s = String.format('&lt;div class="{0}">{1}&lt;/div>', cls, text);
// s now contains the string: '&lt;div class="my-class">Some text&lt;/div>'
     * </code></pre>
     * @param {String} string The tokenized string to be formatted
     * @param {String} value1 The value to replace token {0}
     * @param {String} value2 Etc...
     * @return {String} The formatted string
     * @static
     */
    format : function(format){
        var args = Ext.toArray(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function(m, i){
            return args[i];
        });
    }
});



/**
 * @class Ext.String
 * @singleton
 * Singleton class as helper working with string.   
 */ 
Ext.define("Ext.String", {

    singleton: true,
    
    
    /**
     *
     * UNTESTED 
     *              
     * Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens.  Each
     * token must be unique, and must increment in the format {0}, {1}, etc.  Example usage:
     * <pre><code>
var cls = 'my-class', text = 'Some text';
var s = String.format('&lt;div class="{0}">{1}&lt;/div>', cls, text);
// s now contains the string: '&lt;div class="my-class">Some text&lt;/div>'
     * </code></pre>
     * @param {String} input Input string     
     * @param {String} string The tokenized string to be formatted
     * @param {String} value1 The value to replace token {0}
     * @param {String} value2 Etc...
     * @return {String} The formatted string
     * @static
     */
    format : function(format){
        var args = Ext.toArray(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function(m, i){
            return args[i];
        });
    }
});/**
 * @class Array
 */
Ext.applyIf(Array.prototype, {


    /**
     * Checks whether or not the specified object exists in the array.
     * @param {Object} o The object to check for
     * @param {Number} from (Optional) The index at which to begin the search
     * @return {Number} The index of o in the array (or -1 if it is not found)
     */
    indexOf : function(o, from){
        var len = this.length;
        from = from || 0;
        from += (from < 0) ? len : 0;
        for (; from < len; ++from){
            if(this[from] === o){
                return from;
            }
        }
        return -1;
    },
    
    
    /**
     * Removes the specified object from the array.  If the object is not found nothing happens.
     * @param {Object} o The object to remove
     * @return {Array} this array
     */
    remove : function(o){
        var index = this.indexOf(o);
        if(index != -1){
            this.splice(index, 1);
        }
        return this;
    }
});


/**
 * @class Ext.Array
 * @singleton
 * Singleton class as helper working with arrays.   
 */ 
Ext.define("Ext.Array", {

    singleton: true,
   
   
    /**
     *
     * UNTESTED
     *     
     * Checks whether or not the specified object exists in the array.
     * 
     * @param {Array} ar Input array to work on          
     * @param {Object} o The object to check for
     * @param {Number} from (Optional) The index at which to begin the search
     * @return {Number} The index of o in the array (or -1 if it is not found)
     */
    indexOf : function(ar, o, from){
        var len = ar.length;
        from = from || 0;
        from += (from < 0) ? len : 0;
        for (; from < len; ++from){
            if(ar[from] === o){
                return from;
            }
        }
        return -1;
    },
    
    
    /**
     *
     * UNTESTED
     *     
     * Removes the specified object from the array.  
     * If the object is not found nothing happens.
     * 
     * @param {Array} ar Input array to work on     
     * @param {Object} o The object to remove
     * @return {Array} The array
     */
    remove : function(ar, o){
        var index = ar.indexOf(o);
        if(index != -1){
            ar.splice(index, 1);
        }
        return ar;
    } 
});/**
 * @class Ext.Template
 * <p>Represents a fragment template. Templates may be {@link #compile precompiled}
 * for greater performance.</p>
 * <p>For example usage {@link #Template see the constructor}.</p>
 * 
 * @constructor
 * An instance of this class may be created by passing to the constructor either
 * a single argument, or multiple arguments:
 * <div class="mdetail-params"><ul>
 * <li><b>single argument</b> : String/Array
 * <div class="sub-desc">
 * The single argument may be either a String or an Array:<ul>
 * <li><tt>String</tt> : </li><pre><code>
var t = new Ext.Template("&lt;div>Hello {0}.&lt;/div>");
t.{@link #append}('some-element', ['foo']);
 * </code></pre>
 * <li><tt>Array</tt> : </li>
 * An Array will be combined with <code>join('')</code>.
<pre><code>
var t = new Ext.Template([
    '&lt;div name="{id}"&gt;',
        '&lt;span class="{cls}"&gt;{name:trim} {value:ellipsis(10)}&lt;/span&gt;',
    '&lt;/div&gt;',
]);
t.{@link #compile}();
t.{@link #append}('some-element', {id: 'myid', cls: 'myclass', name: 'foo', value: 'bar'});
</code></pre>
 * </ul></div></li>
 * <li><b>multiple arguments</b> : String, Object, Array, ...
 * <div class="sub-desc">
 * Multiple arguments will be combined with <code>join('')</code>.
 * <pre><code>
var t = new Ext.Template(
    '&lt;div name="{id}"&gt;',
        '&lt;span class="{cls}"&gt;{name} {value}&lt;/span&gt;',
    '&lt;/div&gt;',
    // a configuration object:
    {
        compiled: true,      // {@link #compile} immediately
        disableFormats: true // See Notes below.
    } 
);
 * </code></pre>
 * <p><b>Notes</b>:</p>
 * <div class="mdetail-params"><ul>
 * <li>Formatting and <code>disableFormats</code> are not applicable for Ext Core.</li>
 * <li>For a list of available format functions, see {@link Ext.util.Format}.</li>
 * <li><code>disableFormats</code> reduces <code>{@link #apply}</code> time
 * when no formatting is required.</li>
 * </ul></div>
 * </div></li>
 * </ul></div>
 * @param {Mixed} config
 */
Ext.Template = function(content){
    var me = this,
    	a = arguments,
    	buf = [];

    if (Ext.isArray(content)) {
        content = content.join("");
    } else if (a.length > 1) {
	    Ext.each(a, function(v) {
            if (Ext.isObject(v)) {
                Ext.apply(me, v);
            } else {
                buf.push(v);
            }
        });
        content = buf.join('');
    }

    /**@private*/
    me.content = content;
    /**
     * @cfg {Boolean} compiled Specify <tt>true</tt> to compile the template
     * immediately (see <code>{@link #compile}</code>).
     * Defaults to <tt>false</tt>.
     */
    if (me.compiled) {
        me.compile();
    }
};

Ext.Template.prototype = {
    /**
     * @cfg {RegExp} re The regular expression used to match template variables.
     * Defaults to:<pre><code>
     * re : /\{([\w-]+)\}/g                                     // for Ext Core
     * re : /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g      // for Ext JS
     * </code></pre>
     */
    re : /\{([\w-]+)\}/g,
    /**
     * See <code>{@link #re}</code>.
     * @type RegExp
     * @property re
     */

    /**
     * Returns an content fragment of this template with the specified <code>values</code> applied.
     * @param {Object/Array} values
     * The template values. Can be an array if the params are numeric (i.e. <code>{0}</code>)
     * or an object (i.e. <code>{foo: 'bar'}</code>).
     * @return {String} The content fragment
     */
    applyTemplate : function(values){
		    var me = this;

        return me.compiled ?
        		me.compiled(values) :
				      me.content.replace(me.re, function(m, name){
		        	return values[name] !== undefined ? values[name] : "";
		        });
	   },

    /**
     * Sets the content used as the template and optionally compiles it.
     * @param {String} content
     * @param {Boolean} compile (optional) True to compile the template (defaults to undefined)
     * @return {Ext.Template} this
     */
    set : function(content, compile){
	    var me = this;
        me.content = content;
        me.compiled = null;
        return compile ? me.compile() : me;
    },

    /**
     * Compiles the template into an internal function, eliminating the RegEx overhead.
     * @return {Ext.Template} this
     */
    compile : function(){
        var me = this,
        	  sep = "+";

        function fn(m, name){                        
	        name = "values['" + name + "']";
	        return "'"+ sep + '(' + name + " == undefined ? '' : " + name + ')' + sep + "'";
        }
                
        //eval("this.compiled = function(values){ return " + (Ext.isGecko ? "'" : "['") +
        eval("this.compiled = function(values){ return " + ("'") +
             me.content.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn) +   
             ("';};"));
        //     (Ext.isGecko ?  "';};" : "'].join('');};"));
        return me;
    }
};
/**
 * Alias for {@link #applyTemplate}
 * Returns an HTML fragment of this template with the specified <code>values</code> applied.
 * @param {Object/Array} values
 * The template values. Can be an array if the params are numeric (i.e. <code>{0}</code>)
 * or an object (i.e. <code>{foo: 'bar'}</code>).
 * @return {String} The HTML fragment
 * @member Ext.Template
 * @method apply
 */
Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;

/**
 * @class Ext.util.TaskRunner
 * Provides the ability to execute one or more arbitrary tasks in a multithreaded
 * manner.  Generally, you can use the singleton {@link Ext.TaskMgr} instead, but
 * if needed, you can create separate instances of TaskRunner.  Any number of
 * separate tasks can be started at any time and will run independently of each
 * other. Example usage:
 * <pre><code>
// Start a simple clock task that updates a div once per second
var updateClock = function(){
    Ext.fly('clock').update(new Date().format('g:i:s A'));
} 
var task = {
    run: updateClock,
    interval: 1000 //1 second
}
var runner = new Ext.util.TaskRunner();
runner.start(task);

// equivalent using TaskMgr
Ext.TaskMgr.start({
    run: updateClock,
    interval: 1000
});

 * </code></pre>
 * Also see {@link Ext.util.DelayedTask}. 
 * 
 * @constructor
 * @param {Number} interval (optional) The minimum precision in milliseconds supported by this TaskRunner instance
 * (defaults to 10)
 */
Ext.util.TaskRunner = function(interval){
    interval = interval || 10;
    var tasks = [], 
    	removeQueue = [],
    	id = 0,
    	running = false,

    	// private
    	stopThread = function(){
	        running = false;
	        clearInterval(id);
	        id = 0;
	    },

    	// private
    	startThread = function(){
	        if(!running){
	            running = true;
	            id = setInterval(runTasks, interval);
	        }
	    },

    	// private
    	removeTask = function(t){
	        removeQueue.push(t);
	        if(t.onStop){
	            t.onStop.apply(t.scope || t);
	        }
	    },
	    
    	// private
    	runTasks = function(){
	    	var rqLen = removeQueue.length,
	    		now = new Date().getTime();	    			    		
	    
	        if(rqLen > 0){
	            for(var i = 0; i < rqLen; i++){
	                tasks.remove(removeQueue[i]);
	            }
	            removeQueue = [];
	            if(tasks.length < 1){
	                stopThread();
	                return;
	            }
	        }	        
	        for(var i = 0, t, itime, rt, len = tasks.length; i < len; ++i){
	            t = tasks[i];
	            itime = now - t.taskRunTime;
	            if(t.interval <= itime){
	                rt = t.run.apply(t.scope || t, t.args || [++t.taskRunCount]);
	                t.taskRunTime = now;
	                if(rt === false || t.taskRunCount === t.repeat){
	                    removeTask(t);
	                    return;
	                }
	            }
	            if(t.duration && t.duration <= (now - t.taskStartTime)){
	                removeTask(t);
	            }
	        }
	    };

    /**
     * Starts a new task.
     * @method start
     * @param {Object} task A config object that supports the following properties:<ul>
     * <li><code>run</code> : Function<div class="sub-desc">The function to execute each time the task is run. The
     * function will be called at each interval and passed the <code>args</code> argument if specified.  If a
     * particular scope is required, be sure to specify it using the <code>scope</code> argument.</div></li>
     * <li><code>interval</code> : Number<div class="sub-desc">The frequency in milliseconds with which the task
     * should be executed.</div></li>
     * <li><code>args</code> : Array<div class="sub-desc">(optional) An array of arguments to be passed to the function
     * specified by <code>run</code>.</div></li>
     * <li><code>scope</code> : Object<div class="sub-desc">(optional) The scope (<tt>this</tt> reference) in which to execute the
     * <code>run</code> function. Defaults to the task config object.</div></li>
     * <li><code>duration</code> : Number<div class="sub-desc">(optional) The length of time in milliseconds to execute
     * the task before stopping automatically (defaults to indefinite).</div></li>
     * <li><code>repeat</code> : Number<div class="sub-desc">(optional) The number of times to execute the task before
     * stopping automatically (defaults to indefinite).</div></li>
     * </ul>
     * @return {Object} The task
     */
    this.start = function(task){
        tasks.push(task);
        task.taskStartTime = new Date().getTime();
        task.taskRunTime = 0;
        task.taskRunCount = 0;
        startThread();
        return task;
    };

    /**
     * Stops an existing running task.
     * @method stop
     * @param {Object} task The task to stop
     * @return {Object} The task
     */
    this.stop = function(task){
        removeTask(task);
        return task;
    };

    /**
     * Stops all tasks that are currently running.
     * @method stopAll
     */
    this.stopAll = function(){
        stopThread();
        for(var i = 0, len = tasks.length; i < len; i++){
            if(tasks[i].onStop){
                tasks[i].onStop();
            }
        }
        tasks = [];
        removeQueue = [];
    };
};


/**
 * @class Ext.TaskMgr
 * @extends Ext.util.TaskRunner
 * A static {@link Ext.util.TaskRunner} instance that can be used to start and stop arbitrary tasks.  See
 * {@link Ext.util.TaskRunner} for supported methods and task config properties.
 * <pre><code>
// Start a simple clock task that updates a div once per second
var task = {
    run: function(){
        Ext.fly('clock').update(new Date().format('g:i:s A'));
    },
    interval: 1000 //1 second
}
Ext.TaskMgr.start(task);
</code></pre>
 * @singleton
 */
Ext.TaskMgr = new Ext.util.TaskRunner();
/**
 * @class Ext.util.DelayedTask
 * <p> The DelayedTask class provides a convenient way to "buffer" the execution of a method,
 * performing setTimeout where a new timeout cancels the old timeout. When called, the
 * task will wait the specified time period before executing. If durng that time period,
 * the task is called again, the original call will be cancelled. This continues so that
 * the function is only called a single time for each iteration.</p>
 * <p>This method is especially useful for things like detecting whether a user has finished
 * typing in a text field. An example would be performing validation on a keypress. You can
 * use this class to buffer the keypress events for a certain number of milliseconds, and
 * perform only if they stop for that amount of time.  Usage:</p><pre><code>
var task = new Ext.util.DelayedTask(function(){
    alert(Ext.getDom('myInputField').value.length);
});
// Wait 500ms before calling our function. If the user presses another key 
// during that 500ms, it will be cancelled and we'll wait another 500ms.
Ext.get('myInputField').on('keypress', function(){
    task.{@link #delay}(500); 
});
 * </code></pre> 
 * <p>Note that we are using a DelayedTask here to illustrate a point. The configuration
 * option <tt>buffer</tt> for {@link Ext.util.Observable#addListener addListener/on} will
 * also setup a delayed task for you to buffer events.</p> 
 * @constructor The parameters to this constructor serve as defaults and are not required.
 * @param {Function} fn (optional) The default function to call.
 * @param {Object} scope The default scope (The <code><b>this</b></code> reference) in which the
 * function is called. If not specified, <code>this</code> will refer to the browser window.
 * @param {Array} args (optional) The default Array of arguments.
 */
Ext.util.DelayedTask = function(fn, scope, args){
    var me = this,
    	id,    	
    	call = function(){
    		clearInterval(id);
	        id = null;
	        fn.apply(scope, args || []);
	    };
	    
    /**
     * Cancels any pending timeout and queues a new one
     * @param {Number} delay The milliseconds to delay
     * @param {Function} newFn (optional) Overrides function passed to constructor
     * @param {Object} newScope (optional) Overrides scope passed to constructor. Remember that if no scope
     * is specified, <code>this</code> will refer to the browser window.
     * @param {Array} newArgs (optional) Overrides args passed to constructor
     */
    me.delay = function(delay, newFn, newScope, newArgs){
        me.cancel();
        fn = newFn || fn;
        scope = newScope || scope;
        args = newArgs || args;
        id = setInterval(call, delay);
    };

    /**
     * Cancel the last queued timeout
     */
    me.cancel = function(){
        if(id){
            clearInterval(id);
            id = null;
        }
    };
};
/**
 * @class Ext.Registry
 * @singleton
 * 
 * Class for working with global variables. 
 */ 
Ext.define("Ext.Registry", {


    singleton: true,
    
    
    /**
     * Sets a value identified by name
     *
     * @param {String} name Name identifier
     * @param {Mixed} value Value to set
     * @return {void}
     */
    set: function(name, value) {
        global.registry[name] = value;
    },
    
    
    /**
     * Returns value by name
     *
     * @return {Mixed} Value
     */
    get: function(name) {
        return global.registry[name];
    },
    
    
    /**
     * Checks if a key is exisitng in global registry
     * 
     * @return {Boolean}          
     */         
    isset: function(name) {
        if (global.registry[name]) {
            return true;
        }
        return false;
    }
});

// Create registry namespace in global scope
global.registry = {};
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
global.Extode = Ext;/**
 * @classs Ext.Template
 * @singleton
 *
 * Templating wrapper for EJS.
 */
Ext.define('Ext.Template', {

    singleton: true,


    /**
     * Renders an EJS markup given
     *
     * @param {String} data Markup to render
     * @param {Object} vars Local variables to expose to the template (Optional)
     * @param {String} filename Name of the file/path of the template (Optional)
     * @retrun {String} Rendered markup
     */
    render: function(data, vars, filename) {

        return global.App.ejs.render(data || "", {
            locals: vars || {},
            open: '<ejs>',
            close: '</ejs>',
            filename: filename || "",
            scope: global
        });
    },


    /**
     * Renders an EJS file from the web folder path
     *
     * @param {String} filename Name of the file/path to render
     * @param {Object} vars Local variables to expose to the template (Optional)
     * @retrun {String} Rendered markup
     */
    renderFile: function(filename, vars) {

        var fs = global.App.fs,
            data = "", fileStat,
            filename = global.App.getWebFolderPath() + "/" + filename;

        fileStat = fs.statSync(filename);

        if (fileStat.isFile()) {
            return Ext.Template.render(fs.readFileSync(filename, "binary"), vars || {});
        } else {
           Ext.warn("[Ext.Template] File to render is not a file or not existing: " + filename);
           return "";
        }
    },


    /**
     * This method is asynchronous!
     *
     * Renders a specific template as a partial in a asynchronous way
     * (Webbrowser requests a partial over a websocket via JavaScript _after_
     * the whole HTML template was loaded by the webbrowser via GET)
     * This is good for loading things like portlets, content areas or
     * even load-intense templates which produce load on the server.
     * Single requets can be better balanced than one big request.
     *
     * @param {String} domId ID of the DOM element to be filled with the replacing content
     * @param {String} filename Name/path of the template to render
     * @param {Object} options Allows to set options to specify like delay etc.
     *                 <pre><code>
     *                     {delay: 500} // Load content at point in time domReady + 500ms
     *                 </code></pre>
     * @param {Object} vars Local variables to expose to the template for rendering
     * @return {String} HTML string to pass to the root template that shall trigger the async partial rendering
     */
    renderPartial: function(domId, filename, options, vars) {

        return "<script type='text/javascript'>" +
            "Extode.addPartialExec(function() {" +
                "if (typeof Extode == 'undefined' || Extode.socket == 'undefined') {" +
                    "throw 'Extode.socket needs to initialized in <head>. Just insert the code: <%- Extode.renderInitHeadScripts() %> there!';" +
                "} else {" +
                    "Extode.socket.emit('getpartial', {" +
                        "domId: '" + domId + "'," +
                        "filename: '" + filename + "'," +
                        "options: " + JSON.stringify(options) + "," +
                        "vars: " + JSON.stringify(vars) +
                    "});" +
                "}" +
            "});" +
        "</script>"
    }
});/**
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
/**
 * @class Ext.Servlet
 * 
 * Class that provides standard dispatcher methods
 * for HTTP operations. Can deliver any static file content
 * and also render EJS (embedded js) templates as HTML and JSON.
 */
Ext.define('Ext.Servlet', {

    singleton: true,
    
    
    /**
     * @var {String} indexFile Name of the index file
     */
    indexFile: "index.ejs",
    
    
    /**
     * Method to dispatch static file requests
     * @param {Object} req Request object
     * @param {object} res Response object
     * @return void
     */
    dispatchStaticFiles: function(req, res) {
    
        var me = this, fs = global.App.fs,
            rootDir = global.App.getWebFolderPath(),
            reqPath = req.params[0], 
            targetFile = "";
        
        // If no path given, use index file
        if (reqPath.length === 0) {
            reqPath = Ext.Servlet.indexFile;
        }
        
        // Determine target file
        targetFile = Ext.appDirPath + "/" + rootDir + "/" + reqPath;

        log("TARGET: "  + targetFile);

        // Dispatch file dispatching
        fs.stat(targetFile, function(err, stats) {
        
            if (err) {
                if (err.code === 'ENOENT') {
                    Ext.Servlet.on404(req, res);
                } else {
                    Ext.Servlet.on500(req, res);
                }
            } else {
                Ext.Servlet.deliverFile(req, res, targetFile, fs);
            }
        });

        // Free memory
        delete rootDir, reqPath, targetFile;
    },
    
    
    /**
     * Impl whats todo on error 404 (not found)
     * @param {Object} req Request object
     * @param {object} res Response object
     * @return void
     */
    on404: function(req, res) {
        res.send(404);
    },
    
    
    /**
     * Impl whats todo on error 500 (internal server error)
     * @param {Object} req Request object
     * @param {object} res Response object
     * @return void
     */
    on500: function(req, res) {
        res.send(500);
    },
    
    
    /**
     * Delivers a file requested via HTTP/GET
     *
     * @param {Object} req Request object
     * @param {object} res Response object
     * @param {String} filePath Path of file to deliver
     * @param {Object} fs Filesystem module reference
     * @return void
     */
    deliverFile: function(req, res, filePath, fs) {
    
        var contentType = global.App.mime.lookup(filePath),
            fileNameEnding = filePath.split('.'),
            fileNameEnding = fileNameEnding[fileNameEnding.length-1],
            data = fs.readFileSync(filePath, "binary"),
            httpStatus = 200;
            
        // EJS html/json files need to be processed by ejs
        if (fileNameEnding === "ejs" || fileNameEnding === "ejson") {
        
            // Set content type explicitly
            contentType = 'text/html';
            
            // Render the EJS template
            try {
                data = Ext.Template.render(data, {
                    App: global.App,
                    Request: req,
                    Response: res,
                    Ext: Ext
                });
            } catch(e) {

                // In case of any error, emit an internal server error
                httpStatus = 500;
                data = "Template error: " + e.message;
            }
            
            if (fileNameEnding === "ejson") {
                contentType = "application/json";
            }
        }
                
        // Synchronous deliver the content
        res.writeHead(httpStatus, {'Content-Type': contentType});
        res.write(data, "binary");
        res.end();

        // Free memory
        delete contentType, data, fileNameEnding, httpStatus;
    }
});/**
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
/**
 * Implements a service to deliver partial content asynchronously.
 * This service will be activated by default and is the server-side
 * part of the Ext.Template.renderPartial() rendering feature.
 */
Ext.define('Ext.service.Partial', {

    extend: 'Ext.app.Service',

    name: 'Partial',

    statics: {

        /**
         * Returns the JavaScript code to support socket.io and
         * partial async rendering in the webbrowser.
         * @return {String}
         */
        getPartialWebSupportScript: function() {

            return Ext.String.format(
                "Extode.partialExecs = [];" +
                "Extode.hasRegisteredPartialRenderer = false;" +
                "Extode.addPartialExec = function(fn) {" +
                "    if (!Extode.hasRegisteredPartialRenderer) {" +
                "        Extode.registerPartialRenderer();" +
                "    }" +
                "    fn();" +
                "};" +

                "Extode.registerPartialRenderer = function() {" +
                "    Extode.hasRegisteredPartialRenderer = true;" +
                "    Extode.socket.on('partial', function(partial) {" +
                "        var targetEl = document.getElementById(partial.domId);" +
                "        if (typeof targetEl != 'undefined' && targetEl !== null) {" +
                "            targetEl.innerHTML = partial.html;" +
                "        }" +
                "    });" +
                "}"
            );
        }
    },
    

    /**
     * Gets called on controller init
     */
    init: function() {

        Ext.debug("Start Partial service");

        // Register a topic to handle
        this.handle({
            getpartial: this.onGetPartial
        });
    },


    /**
     * Gets called when the frontend emits a message
     * with the given topic
     *
     * @param {Object} payload Payload sent by the frontend
     * @return void
     */
    onGetPartial: function(partialInfo) {

        this.emit('partial', {
            domId: partialInfo.domId,
            options: partialInfo.options,
            html: 'Should deliver partial with path: ' + partialInfo.filename + ' :-) and info: ' + JSON.stringify(partialInfo.vars)
        });
    }
});/**
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
