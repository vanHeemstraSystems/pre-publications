/*
 * PageRouter
 */
define(['./Base'], function (Base) {
    console.log('CORE: pageRouter called');
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    	var r = (d + Math.random()*16)%16 | 0;
    	d = Math.floor(d/16);
    	return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });  
    // ORIGINAL var _PageRouter = new Base(uuid); 
    var options = options || {}; 	
    options.routes = {
    	"": "redirectToMain"
    };
    var _PageRouter = new Base(uuid, options); // extended for options to adopt Backbone Router
    return _PageRouter;
});


/* ORIGINAL of QuizEngine

console.log('CORE: QuizEngine.Router called');
QuizEngine.Router = Marionette.AppRouter.extend({
    routes: {
        "": "redirectToMain"
    },

    redirectToMain: function() {
        console.log('CORE: QuizEngine.Router.redirectToMain called');
        Backbone.history.navigate('list', { trigger: true, replace: true});
    }
});

QuizEngine.addInitializer(function() {
    console.log('CORE: QuizEngine.addInitializer called');
    QuizEngine.router = new QuizEngine.Router();
});

*/