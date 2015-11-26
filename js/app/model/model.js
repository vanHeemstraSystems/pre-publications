/*
 * Model
 */
define(['./Base'], function (Base) {
    console.log('CORE: model called');
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    	var r = (d + Math.random()*16)%16 | 0;
    	d = Math.floor(d/16);
    	return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });    	
    // ORIGINAL var _Model = new Base(uuid);
    var attributes = attributes || {};
    var options = options || {};
    var _Model = new Base(uuid, attributes, options); // extended for arguments & options to adopt Backbone Model  
    return _Model;
});
