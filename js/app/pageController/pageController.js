/*
 * PageController
 */
define(['./Base'], function (Base) {
    console.log('CORE: pageController called');
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });  
    // ORIGINAL var _PageController = new Base(uuid);  
    var attributes = attributes || {};
    var options = options || {};       
    var _PageController = new Base(uuid, attributes, options); // extended for attributes & options to adopt Backbone       
    return _PageController;
});

/* TEMP COMMENTED OUT - QuizEngine specific 
QuizEngine.Helpers = QuizEngine.Helpers || {};
QuizEngine.Helpers.SubAppManager = (function() {
    console.log('CORE: QuizEngine.Helpers.SubAppManager called');
    var SubAppManager = Marionette.Controller.extend({
        startSubApp: function(name, args) {
            console.log('CORE: QuizEngine.Helpers.SubAppManager.startSubApp called');
            console.log('CORE: name: ' + name);
            console.log('CORE: args: ' + args);
            var newApp = QuizEngine.module(name);

            if (this.currentApp === newApp) {
                return;
            }

            if (this.currentApp) {
                this.currentApp.stop();
                // Nothing Responds to it, but can be an extension point
                QuizEngine.vent.trigger('subapp:stopped', this.currentAppName);
            }

            this.currentApp = newApp;
            this.currentAppName = name;

            newApp.start(args);
            // Nothing Responds to it, but can be an extension point
            QuizEngine.vent.trigger('subapp:started', name);
        }
    });

    var manager = new SubAppManager();
    QuizEngine.commands.setHandler('subapp:start', manager.startSubApp, manager);

    return manager;

})();
*/
