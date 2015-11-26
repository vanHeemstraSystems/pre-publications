/*
 * PageBase
 */
define(function () {
    console.log('CORE: pageBase called');	
    function pageBase(id, attributes, options) { // Extended with attributes and options for Backbone adopted functionality
        this.id = id;
        this.keyValuePairs = {};
        // Adopted from Backbone
        var attrs = attributes || {};
        options || (options = {});
        this.cid = _.uniqueId('c');
        this.attributes = {};  
        if(options.collection) this.collection = options.collection;
        if(options.parse) attrs = this.parse(attrs, options) || {};        
        attrs = _.defaults({}, attrs, _.result(this, 'defaults'));       
    };
    pageBase.prototype = {
        getValue: function (key) {
            console.log('CORE: pageBase getValue(key) called');
            console.log('key = ' + key);
            var searchKey = key;
            var keyFound = false;
            var value;
            for(key in this.keyValuePairs) {
                if(key == searchKey){
                    keyFound = true;
                    value = this.keyValuePairs[key];
                }
            }
            if(keyFound) {
                console.log('key found');
            }
            else {
                console.log('key not found');
            }
            console.log('value = ' + value);
            return value;
        },
        setValue: function (key, value) {
            console.log('CORE: pageBase setValue(key, value) called'); 
            // To Do: search for key in keyValuePairs and updated its value           
            // value = value;
        },
        getKeyValuePairs: function () {
            console.log('CORE: pageBase getKeyValuePairs() called');             
            return this.keyValuePairs;
        },
        setKeyValuePairs: function (keyValuePairs) {
            console.log('CORE: pageBase setKeyValuePairs(keyValuePairs) called');         
            this.keyValuePairs = keyValuePairs;
        },
        // Adopted from QuizEngine example
        // ORIGINAL var QuizEngine = (function(){ ... })();
        initApplication: function () {
            console.log('CORE: pageBase initApplication() called'); 
        //    var Application = Marionette.Application.extend({}); // TO DO Make this compatible with CORE 
            // ORIGINAL var application = new Application(); 
            var Application = this.Application.extend({});
            var application = new Application();
            application.addRegions({
                header: '[data-region=header]', // Not used right now
                body: '[data-region=body]',
                footer: '[data-region=footer]' // Not used right now
            });
        /*
            // application.on('initialize:after', function() { // Marionette 1 version
            application.on('start', function() { // Marionette 2 version
                console.log('CORE: Page start event caught');
                //ORIGINAL Backbone.history.start();
                CORE.main.history.start();
            });
        */
            return application;     
        },
        // Add Application here, with all its methods and properties
        // similar to Marionette.Application
        Application: {
            // Adopted from Backbone
            // Helpers
            // -------
            // Helper function to correctly set up the prototype chain, for subclasses.
            // Similar to `goog.inherits`, but uses a hash of prototype properties and
            // class properties to be extended.        
            extend: function(protoProps, staticProps) {
                console.log('CORE: pageBase Application.extend(protoProps, staticProps) called');
                console.log('CORE: pageBase Application.extend(protoProps, staticProps): protoProps =');
                console.log(protoProps);
                console.log('CORE: pageBase Application.extend(protoProps, staticProps): staticProps =');
                console.log(staticProps);
                var parent = this;
                var child;
                // The constructor function for the new subclass is either defined by you
                // (the "constructor" property in your `extend` definition), or defaulted
                // by us to simply call the parent's constructor.
                if (protoProps && _.has(protoProps, 'constructor')) {
                    console.log('CORE: pageBase Application.extend(protoProps, staticProps): if protoProps');
                    child = protoProps.constructor;
                } else {
                    console.log('CORE: pageBase Application.extend(protoProps, staticProps): else');
                    console.log('CORE: pageBase Application.extend(protoProps, staticProps): else: parent');
                    console.log(parent);
                    console.log('CORE: pageBase Application.extend(protoProps, staticProps): else: this');
                    console.log(this);
                    console.log('CORE: pageBase Application.extend(protoProps, staticProps): else: arguments');
                    console.log(arguments);
                    console.log('CORE: pageBase Application.extend(protoProps, staticProps): else: parent.hasOwnProperty("apply")');
                    console.log(parent.hasOwnProperty('apply'));

                    child = function(){ return parent.apply(this, arguments); }; // Causes: Uncaught TypeError: undefined is not a function
                }
                // Add static properties to the constructor function, if supplied.
                _.extend(child, parent, staticProps);
                // Set the prototype chain to inherit from `parent`, without calling
                // `parent`'s constructor function.
                var Surrogate = function(){ this.constructor = child; };
                Surrogate.prototype = parent.prototype;
                child.prototype = new Surrogate;
                // Add prototype properties (instance properties) to the subclass,
                // if supplied.
                if (protoProps) _.extend(child.prototype, protoProps);
                // Set a convenience property in case the parent's prototype is needed
                // later.
                child.__super__ = parent.prototype;
                return child;
            },
            // Add regions to your app.
            // Accepts a hash of named strings or Region objects
            // addRegions({something: "#someRegion"})
            // addRegions({something: Region.extend({el: "#someRegion"}) });
            addRegions: function(regions) {
                console.log('CORE: pageBase Application.addRegions(regions) called'); 
              //ORIGINAL return this._regionManager.addRegions(regions);
              // TO DO
            }

            // TO DO MORE
        }
    };
    return pageBase;
});
