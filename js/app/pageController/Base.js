/*
 * PageControllerBase
 */
define(function () {
    console.log('CORE: pageControllerBase called');	
    function pageControllerBase(id, attributes, options) {// Extended with attributes and options for Backbone adopted functionality
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
    pageControllerBase.prototype = {
        getValue: function (key) {
            console.log('CORE: pageControllerBase getValue(key) called');
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
            console.log('CORE: pageControllerBase setValue(key, value) called'); 
            // To Do: search for key in keyValuePairs and updated its value           
            // value = value;
        },
        getKeyValuePairs: function () {
            console.log('CORE: pageControllerBase getKeyValuePairs() called');             
            return this.keyValuePairs;
        },
        setKeyValuePairs: function (keyValuePairs) {
            console.log('CORE: pageControllerBase setKeyValuePairs(keyValuePairs) called');         
            this.keyValuePairs = keyValuePairs;
        }
    };
    return pageControllerBase;
});
