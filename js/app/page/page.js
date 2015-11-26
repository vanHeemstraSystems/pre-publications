/*
 * Page
 */
define(['./Base'], function (Base) {
    console.log('CORE: page called');
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });  
    // ORIGINAL var _Page = new Base(uuid);    
    var attributes = attributes || {};
    var options = options || {};       
    var _Page = new Base(uuid, attributes, options); // extended for arguments & options to adopt Backbone       
    // Make Application available as a direct property of CORE
//    CORE.Application = _Page.initApplication();    // TEMP COMMENTED OUT, FOR IT GIVES ERRORS
    // We can now use CORE.Application instead of QuizEngine
    return _Page;
});