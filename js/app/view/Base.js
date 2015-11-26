/*
 * ViewBase
 */
define(function () {
    console.log('CORE: viewBase called');
    function viewBase(id, options) { // Extended with options for Backbone adopted
		var Main = this.Main = []; // surrogate for: Backbone
        this.id = id;
        this.keyValuePairs = {};
        // Adopted from Backbone
        // Save the previous value of the `Main` variable, so that it can be
        // restored later on, if `noConflict` is used.
        var previousMain = Main;
        // Create local references to array methods we'll want to use later.
		var array = [];
		var push = array.push;
		var slice = array.slice;
		var splice = array.splice;
        // Current version of the library. Keep in sync with `package.json`.
        Main.VERSION = '1.0.0';
        // For our purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
        // the `$` variable.
        Main.$ = $;
        // Runs Base.js in *noConflict* mode, returning the `main` variable
        // to its previous owner. Returns a reference to this Main object.
        Main.noConflict = function() {
            console.log('CORE: viewBase noConflict() called');
            Main = previousMain;
            return this;
        };
        // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
        // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
        // set a `X-Http-Method-Override` header.
        Main.emulateHTTP = false;
        // Turn on `emulateJSON` to support legacy servers that can't deal with direct
        // `application/json` requests ... this will encode the body as
        // `application/x-www-form-urlencoded` instead and will send the model in a
        // form param named `model`.
        Main.emulateJSON = false;
        // Adopted from Backbone
		// Events
		// ---------------
		// A module that can be mixed in to *any object* in order to provide it with
		// custom events. You may bind with `on` or remove with `off` callback
		// functions to an event; `trigger`-ing an event fires all callbacks in
		// succession.
		//
		//     var object = {};
		//     _.extend(object, Backbone.Events);
		//     object.on('expand', function(){ alert('expanded'); });
		//     object.trigger('expand');
		//
		var Events = Main.Events = {
			// Bind an event to a `callback` function. Passing `"all"` will bind
			// the callback to all events fired.
			on: function(name, callback, context) {
				console.log('CORE: viewBase Events on(name, callback, context) called');
				if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
				this._events || (this._events = {});
				var events = this._events[name] || (this._events[name] = []);
				events.push({callback: callback, context: context, ctx: context || this});
				return this;
			},
			// Bind an event to only be triggered a single time. After the first time
			// the callback is invoked, it will be removed.
			once: function(name, callback, context) {
				console.log('CORE: viewBase Events once(name, callback, context) called');
				if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
				var self = this;
				var once = _.once(function() {
					self.off(name, once);
					callback.apply(this, arguments);
				});
				once._callback = callback;
				return this.on(name, once, context);
			},
			// Remove one or many callbacks. If `context` is null, removes all
			// callbacks with that function. If `callback` is null, removes all
			// callbacks for the event. If `name` is null, removes all bound
			// callbacks for all events.
			off: function(name, callback, context) {
				console.log('CORE: viewBase Events off(name, callback, context) called');
				var retain, ev, events, names, i, l, j, k;
				if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
				if (!name && !callback && !context) {
					this._events = void 0;
					return this;
				}
				names = name ? [name] : _.keys(this._events);
				for (i = 0, l = names.length; i < l; i++) {
					name = names[i];
					if (events = this._events[name]) {
						this._events[name] = retain = [];
						if (callback || context) {
							for (j = 0, k = events.length; j < k; j++) {
								ev = events[j];
								if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
								(context && context !== ev.context)) {
									retain.push(ev);
								}
							}
						}
						if (!retain.length) delete this._events[name];
					}
				}
				return this;
			},
			// Trigger one or many events, firing all bound callbacks. Callbacks are
			// passed the same arguments as `trigger` is, apart from the event name
			// (unless you're listening on `"all"`, which will cause your callback to
			// receive the true name of the event as the first argument).
			trigger: function(name) {
				console.log('CORE: viewBase Events trigger(name) called');
				if (!this._events) return this;
				var args = slice.call(arguments, 1);
				if (!eventsApi(this, 'trigger', name, args)) return this;
				var events = this._events[name];
				var allEvents = this._events.all;
				if (events) triggerEvents(events, args);
				if (allEvents) triggerEvents(allEvents, arguments);
				return this;
			},
			// Tell this object to stop listening to either specific events ... or
			// to every object it's currently listening to.
			stopListening: function(obj, name, callback) {
				console.log('CORE: viewBase Events stopListening(obj, name, context) called');
				var listeningTo = this._listeningTo;
				if (!listeningTo) return this;
				var remove = !name && !callback;
				if (!callback && typeof name === 'object') callback = this;
				if (obj) (listeningTo = {})[obj._listenId] = obj;
				for (var id in listeningTo) {
					obj = listeningTo[id];
					obj.off(name, callback, this);
					if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
				}
				return this;
			}
		};
        // Adopted from Backbone
		// Regular expression used to split event strings.
		var eventSplitter = /\s+/;
        // Adopted from Backbone
		// Implement fancy features of the Events API such as multiple event
		// names `"change blur"` and jQuery-style event maps `{change: action}`
		// in terms of the existing API.
		var eventsApi = function(obj, action, name, rest) {
			console.log('CORE: viewBase eventsApi(obj, action, name, rest) called');
			if (!name) return true;
			// Handle event maps.
			if (typeof name === 'object') {
				for (var key in name) {
					obj[action].apply(obj, [key, name[key]].concat(rest));
				}
				return false;
			}
			// Handle space separated event names.
			if (eventSplitter.test(name)) {
				var names = name.split(eventSplitter);
				for (var i = 0, l = names.length; i < l; i++) {
					obj[action].apply(obj, [names[i]].concat(rest));
				}
				return false;
			}
			return true;
		};
        // Adopted from Backbone
		// A difficult-to-believe, but optimized internal dispatch function for
		// triggering events. Tries to keep the usual cases speedy (most internal
		// Backbone events have 3 arguments).
		var triggerEvents = function(events, args) {
			console.log('CORE: viewBase Events triggerEvents(events, args) called');
			var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
			switch (args.length) {
				case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
				case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
				case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
				case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
				default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
			}
		};
        // Adopted from Backbone
		var listenMethods = {listenTo: 'on', listenToOnce: 'once'};
        // Adopted from Backbone
		// Inversion-of-control versions of `on` and `once`. Tell *this* object to
		// listen to an event in another object ... keeping track of what it's
		// listening to.
		_.each(listenMethods, function(implementation, method) {
			Events[method] = function(obj, name, callback) {
				var listeningTo = this._listeningTo || (this._listeningTo = {});
				var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
				listeningTo[id] = obj;
				if (!callback && typeof name === 'object') callback = this;
				obj[implementation](name, callback, this);
				return this;
			};
		});
        // Adopted from Backbone
		// Aliases for backwards compatibility.
		Events.bind   = Events.on;
		Events.unbind = Events.off;
        // Adopted from Backbone
		// Allow the `Backbone` object to serve as a global event bus, for folks who
		// want global "pubsub" in a convenient place.
		_.extend(Main, Events);
        // Adopted from Backbone
		// Backbone.View
		// -------------
		// Backbone Views are almost more convention than they are actual code. A View
		// is simply a JavaScript object that represents a logical chunk of UI in the
		// DOM. This might be a single item, an entire list, a sidebar or panel, or
		// even the surrounding frame which wraps your whole app. Defining a chunk of
		// UI as a **View** allows you to define your DOM events declaratively, without
		// having to worry about render order ... and makes it easy for the view to
		// react to specific changes in the state of your models.
		// Creating a Backbone.View creates its initial element outside of the DOM,
		// if an existing element is not provided...
		var View = Main.View = function(options) {
			console.log('CORE: viewBase View(options) called');
			console.log('CORE: viewBase View(options) options = ');
			console.log(options);
			this.cid = _.uniqueId('view');
			options || (options = {});
			_.extend(this, _.pick(options, viewOptions));
			this._ensureElement();
			this.initialize.apply(this, arguments);
			this.delegateEvents();
		};
        // Adopted from Backbone
		// Cached regex to split keys for `delegate`.
		var delegateEventSplitter = /^(\S+)\s*(.*)$/;
        // Adopted from Backbone
		// List of view options to be merged as properties.
		var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];
        // Adopted from Backbone
		// Set up all inheritable **Backbone.View** properties and methods.
		_.extend(View.prototype, Events, {
			// The default `tagName` of a View's element is `"div"`.
			tagName: 'div',
			// jQuery delegate for element lookup, scoped to DOM elements within the
			// current view. This should be preferred to global lookups where possible.
			$: function(selector) {
				return this.$el.find(selector);
			},
			// Initialize is an empty function by default. Override it with your own
			// initialization logic.
			initialize: function(){
        console.log('CORE: viewBase initialize() called');
      },
			// **render** is the core function that your view should override, in order
			// to populate its element (`this.el`), with the appropriate HTML. The
			// convention is for **render** to always return `this`.
			render: function() {
        console.log('CORE: viewBase render() called');
				return this;
			},
			// Remove this view by taking the element out of the DOM, and removing any
			// applicable Backbone.Events listeners.
			remove: function() {
        console.log('CORE: viewBase remove() called');
				this.$el.remove();
				this.stopListening();
				return this;
			},
			// Change the view's element (`this.el` property), including event
			// re-delegation.
			setElement: function(element, delegate) {
        console.log('CORE: viewBase setElement(element, delegate) called');
				if (this.$el) this.undelegateEvents();
				this.$el = element instanceof Main.$ ? element : Main.$(element);
				this.el = this.$el[0];
				if (delegate !== false) this.delegateEvents();
				return this;
			},
			// Set callbacks, where `this.events` is a hash of
			//
			// *{"event selector": "callback"}*
			//
			//     {
			//       'mousedown .title':  'edit',
			//       'click .button':     'save',
			//       'click .open':       function(e) { ... }
			//     }
			//
			// pairs. Callbacks will be bound to the view, with `this` set properly.
			// Uses event delegation for efficiency.
			// Omitting the selector binds the event to `this.el`.
			// This only works for delegate-able events: not `focus`, `blur`, and
			// not `change`, `submit`, and `reset` in Internet Explorer.
			delegateEvents: function(events) {
				if (!(events || (events = _.result(this, 'events')))) return this;
				this.undelegateEvents();
				for (var key in events) {
					var method = events[key];
					if (!_.isFunction(method)) method = this[events[key]];
					if (!method) continue;
					var match = key.match(delegateEventSplitter);
					var eventName = match[1], selector = match[2];
					method = _.bind(method, this);
					eventName += '.delegateEvents' + this.cid;
					if (selector === '') {
						this.$el.on(eventName, method);
					} else {
						this.$el.on(eventName, selector, method);
					}
				}
				return this;
			},
			// Clears all callbacks previously bound to the view with `delegateEvents`.
			// You usually don't need to use this, but may wish to if you have multiple
			// Backbone views attached to the same DOM element.
			undelegateEvents: function() {
				this.$el.off('.delegateEvents' + this.cid);
				return this;
			},
			// Ensure that the View has a DOM element to render into.
			// If `this.el` is a string, pass it through `$()`, take the first
			// matching element, and re-assign it to `el`. Otherwise, create
			// an element from the `id`, `className` and `tagName` properties.
			_ensureElement: function() {
				if (!this.el) {
					var attrs = _.extend({}, _.result(this, 'attributes'));
					if (this.id) attrs.id = _.result(this, 'id');
					if (this.className) attrs['class'] = _.result(this, 'className');
					var $el = Main.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
					this.setElement($el, false);
				} else {
					this.setElement(_.result(this, 'el'), false);
				}
			}
		});
        // Adopted from Backbone
		// Backbone.Router
		// ---------------
		// Routers map faux-URLs to actions, and fire events when routes are
		// matched. Creating a new one sets its `routes` hash, if not set statically.
		var Router = Main.Router = function(options) {
			console.log('CORE: viewBase Router(options) called');
			console.log('CORE: viewBase Router(options) options = ');
			console.log(options);
			options || (options = {});
			if (options.routes) this.routes = options.routes;
			this._bindRoutes();
			this.initialize.apply(this, arguments);
		};
        // Adopted from Backbone
		// Cached regular expressions for matching named param parts and splatted
		// parts of route strings.
		var optionalParam = /\((.*?)\)/g;
		var namedParam    = /(\(\?)?:\w+/g;
		var splatParam    = /\*\w+/g;
		var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        // Adopted from Backbone
		// Set up all inheritable **Backbone.Router** properties and methods.
		_.extend(Router.prototype, Events, {
			// Initialize is an empty function by default. Override it with your own
			// initialization logic.
			initialize: function(){},
			// Manually bind a single named route to a callback. For example:
			//
			//     this.route('search/:query/p:num', 'search', function(query, num) {
			//       ...
			//     });
			//
			route: function(route, name, callback) {
				if (!_.isRegExp(route)) route = this._routeToRegExp(route);
				if (_.isFunction(name)) {
					callback = name;
					name = '';
				}
				if (!callback) callback = this[name];
				var router = this;
				Main.history.route(route, function(fragment) {
					var args = router._extractParameters(route, fragment);
					router.execute(callback, args);
					router.trigger.apply(router, ['route:' + name].concat(args));
					router.trigger('route', name, args);
					Main.history.trigger('route', router, name, args);
				});
				return this;
			},
			// Execute a route handler with the provided parameters.  This is an
			// excellent place to do pre-route setup or post-route cleanup.
			execute: function(callback, args) {
				if (callback) callback.apply(this, args);
			},
			// Simple proxy to `Backbone.history` to save a fragment into the history.
			navigate: function(fragment, options) {
				Main.history.navigate(fragment, options);
				return this;
			},
			// Bind all defined routes to `Backbone.history`. We have to reverse the
			// order of the routes here to support behavior where the most general
			// routes can be defined at the bottom of the route map.
			_bindRoutes: function() {
				if (!this.routes) return;
				this.routes = _.result(this, 'routes');
				var route, routes = _.keys(this.routes);
				while ((route = routes.pop()) != null) {
					this.route(route, this.routes[route]);
				}
			},
			// Convert a route string into a regular expression, suitable for matching
			// against the current location hash.
			_routeToRegExp: function(route) {
				route = route.replace(escapeRegExp, '\\$&')
							.replace(optionalParam, '(?:$1)?')
							.replace(namedParam, function(match, optional) {
								return optional ? match : '([^/?]+)';
							})
							.replace(splatParam, '([^?]*?)');
				return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
			},
			// Given a route, and a URL fragment that it matches, return the array of
			// extracted decoded parameters. Empty or unmatched parameters will be
			// treated as `null` to normalize cross-browser behavior.
			_extractParameters: function(route, fragment) {
				var params = route.exec(fragment).slice(1);
				return _.map(params, function(param, i) {
					// Don't decode the search params.
					if (i === params.length - 1) return param || null;
					return param ? decodeURIComponent(param) : null;
				});
			}
		});
        // Adopted from Backbone
		// Backbone.History
		// ----------------
		// Handles cross-browser history management, based on either
		// [pushState](http://diveintohtml5.info/history.html) and real URLs, or
		// [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
		// and URL fragments. If the browser supports neither (old IE, natch),
		// falls back to polling.
		var History = Main.History = function() {
			console.log('CORE: viewBase History() called');
			this.handlers = [];
			_.bindAll(this, 'checkUrl');
			// Ensure that `History` can be used outside of the browser.
			if (typeof window !== 'undefined') {
				this.location = window.location;
				this.history = window.history;
			}
		};
        // Adopted from Backbone
		// Cached regex for stripping a leading hash/slash and trailing space.
		var routeStripper = /^[#\/]|\s+$/g;
        // Adopted from Backbone
		// Cached regex for stripping leading and trailing slashes.
		var rootStripper = /^\/+|\/+$/g;
        // Adopted from Backbone
		// Cached regex for detecting MSIE.
		var isExplorer = /msie [\w.]+/;
        // Adopted from Backbone
		// Cached regex for removing a trailing slash.
		var trailingSlash = /\/$/;
        // Adopted from Backbone
		// Cached regex for stripping urls of hash.
		var pathStripper = /#.*$/;
        // Adopted from Backbone
		// Has the history handling already been started?
		History.started = false;
        // Adopted from Backbone
		// Set up all inheritable **Backbone.History** properties and methods.
		_.extend(History.prototype, Events, {
			// The default interval to poll for hash changes, if necessary, is
			// twenty times a second.
			interval: 50,
			// Are we at the app root?
			atRoot: function() {
				return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
			},
			// Gets the true hash value. Cannot use location.hash directly due to bug
			// in Firefox where location.hash will always be decoded.
			getHash: function(window) {
				var match = (window || this).location.href.match(/#(.*)$/);
				return match ? match[1] : '';
			},
			// Get the cross-browser normalized URL fragment, either from the URL,
			// the hash, or the override.
			getFragment: function(fragment, forcePushState) {
				if (fragment == null) {
					if (this._hasPushState || !this._wantsHashChange || forcePushState) {
						fragment = decodeURI(this.location.pathname + this.location.search);
						var root = this.root.replace(trailingSlash, '');
						if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
					} else {
						fragment = this.getHash();
					}
				}
				return fragment.replace(routeStripper, '');
			},
			// Start the hash change handling, returning `true` if the current URL matches
			// an existing route, and `false` otherwise.
			start: function(options) {
				if (History.started) throw new Error("Main.history has already been started");
				History.started = true;
				// Figure out the initial configuration. Do we need an iframe?
				// Is pushState desired ... is it available?
				this.options          = _.extend({root: '/'}, this.options, options);
				this.root             = this.options.root;
				this._wantsHashChange = this.options.hashChange !== false;
				this._wantsPushState  = !!this.options.pushState;
				this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
				var fragment          = this.getFragment();
				var docMode           = document.documentMode;
				var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
				// Normalize root to always include a leading and trailing slash.
				this.root = ('/' + this.root + '/').replace(rootStripper, '/');
				if (oldIE && this._wantsHashChange) {
					var frame = Main.$('<iframe src="javascript:0" tabindex="-1">');
					this.iframe = frame.hide().appendTo('body')[0].contentWindow;
					this.navigate(fragment);
				}
				// Depending on whether we're using pushState or hashes, and whether
				// 'onhashchange' is supported, determine how we check the URL state.
				if (this._hasPushState) {
					Main.$(window).on('popstate', this.checkUrl);
				} else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
					Main.$(window).on('hashchange', this.checkUrl);
				} else if (this._wantsHashChange) {
					this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
				}
				// Determine if we need to change the base url, for a pushState link
				// opened by a non-pushState browser.
				this.fragment = fragment;
				var loc = this.location;
				// Transition from hashChange to pushState or vice versa if both are
				// requested.
				if (this._wantsHashChange && this._wantsPushState) {
					// If we've started off with a route from a `pushState`-enabled
					// browser, but we're currently in a browser that doesn't support it...
					if (!this._hasPushState && !this.atRoot()) {
						this.fragment = this.getFragment(null, true);
						this.location.replace(this.root + '#' + this.fragment);
						// Return immediately as browser will do redirect to new url
						return true;
						// Or if we've started out with a hash-based route, but we're currently
						// in a browser where it could be `pushState`-based instead...
					} else if (this._hasPushState && this.atRoot() && loc.hash) {
						this.fragment = this.getHash().replace(routeStripper, '');
						this.history.replaceState({}, document.title, this.root + this.fragment);
					}
				}
				if (!this.options.silent) return this.loadUrl();
			},
			// Disable Backbone.history, perhaps temporarily. Not useful in a real app,
			// but possibly useful for unit testing Routers.
			stop: function() {
				Main.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
				if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
				History.started = false;
			},
			// Add a route to be tested when the fragment changes. Routes added later
			// may override previous routes.
			route: function(route, callback) {
				this.handlers.unshift({route: route, callback: callback});
			},
			// Checks the current URL to see if it has changed, and if it has,
			// calls `loadUrl`, normalizing across the hidden iframe.
			checkUrl: function(e) {
				var current = this.getFragment();
				if (current === this.fragment && this.iframe) {
					current = this.getFragment(this.getHash(this.iframe));
				}
				if (current === this.fragment) return false;
				if (this.iframe) this.navigate(current);
				this.loadUrl();
			},
			// Attempt to load the current URL fragment. If a route succeeds with a
			// match, returns `true`. If no defined routes matches the fragment,
			// returns `false`.
			loadUrl: function(fragment) {
				fragment = this.fragment = this.getFragment(fragment);
				return _.any(this.handlers, function(handler) {
					if (handler.route.test(fragment)) {
						handler.callback(fragment);
						return true;
					}
				});
			},
			// Save a fragment into the hash history, or replace the URL state if the
			// 'replace' option is passed. You are responsible for properly URL-encoding
			// the fragment in advance.
			//
			// The options object can contain `trigger: true` if you wish to have the
			// route callback be fired (not usually desirable), or `replace: true`, if
			// you wish to modify the current URL without adding an entry to the history.
			navigate: function(fragment, options) {
				if (!History.started) return false;
				if (!options || options === true) options = {trigger: !!options};
				var url = this.root + (fragment = this.getFragment(fragment || ''));
				// Strip the hash for matching.
				fragment = fragment.replace(pathStripper, '');
				if (this.fragment === fragment) return;
				this.fragment = fragment;
				// Don't include a trailing slash on the root.
				if (fragment === '' && url !== '/') url = url.slice(0, -1);
				// If pushState is available, we use it to set the fragment as a real URL.
				if (this._hasPushState) {
					this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
				// If hash changes haven't been explicitly disabled, update the hash
				// fragment to store history.
				} else if (this._wantsHashChange) {
					this._updateHash(this.location, fragment, options.replace);
					if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
						// Opening and closing the iframe tricks IE7 and earlier to push a
						// history entry on hash-tag change.  When replace is true, we don't
						// want this.
						if(!options.replace) this.iframe.document.open().close();
						this._updateHash(this.iframe.location, fragment, options.replace);
					}
					// If you've told us that you explicitly don't want fallback hashchange-
					// based history, then `navigate` becomes a page refresh.
				} else {
					return this.location.assign(url);
				}
				if (options.trigger) return this.loadUrl(fragment);
			},
			// Update the hash location, either replacing the current entry, or adding
			// a new one to the browser history.
			_updateHash: function(location, fragment, replace) {
				if (replace) {
					var href = location.href.replace(/(javascript:|#).*$/, '');
					location.replace(href + '#' + fragment);
				} else {
					// Some browsers require that `hash` contains a leading #.
					location.hash = '#' + fragment;
				}
			}
		});
        // Adopted from Backbone
		// Create the default Backbone.history.
		Main.history = new History;
        // Adopted from Backbone
        // Helpers
        // -------
        // Helper function to correctly set up the prototype chain, for subclasses.
        // Similar to `goog.inherits`, but uses a hash of prototype properties and
        // class properties to be extended.
        var extend = function(protoProps, staticProps) {
            console.log('CORE: viewBase extend(protoProps, staticProps) called');
            console.log('CORE: viewBase extend(protoProps, staticProps): protoProps =');
            console.log(protoProps);
            console.log('CORE: viewBase extend(protoProps, staticProps): staticProps =');
            console.log(staticProps);
            var parent = this;
            var child;
            // The constructor function for the new subclass is either defined by you
            // (the "constructor" property in your `extend` definition), or defaulted
            // by us to simply call the parent's constructor.
            if (protoProps && _.has(protoProps, 'constructor')) {
                child = protoProps.constructor;
            } else {
                child = function(){ return parent.apply(this, arguments); };
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
        };
        // Adopted from Backbone
		// Set up inheritance for the router, view and history.
		Router.extend = View.extend = History.extend = extend;
        // Adopted from Backbone
        // Throw an error when a URL is needed, and none is supplied.
        var urlError = function() {
            console.log('CORE: viewBase urlError() called');
            throw new Error('A "url" property or function must be specified');
        };
        // Adopted from Backbone
        // Wrap an optional error callback with a fallback error event.
        var wrapError = function(model, options) {
            console.log('CORE: viewBase wrapError(model, options) called');
            var error = options.error;
            options.error = function(resp) {
                if (error) error(model, resp, options);
                model.trigger('error', model, resp, options);
            };
        };
    };
    viewBase.prototype = {
        getValue: function (key) {
            console.log('CORE: viewBase getValue(key) called');
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
            console.log('CORE: viewBase setValue(key, value) called');
            // To Do: search for key in keyValuePairs and updated its value
            // value = value;
        },
        getKeyValuePairs: function () {
            console.log('CORE: viewBase getKeyValuePairs() called');
            return this.keyValuePairs;
        },
        setKeyValuePairs: function (keyValuePairs) {
            console.log('CORE: viewBase setKeyValuePairs(keyValuePairs) called');
            this.keyValuePairs = keyValuePairs;
        },
        setViewService: function (viewService) {
            console.log('CORE: viewBase setViewService(viewService) called');
            // The view instance has a property called "viewService"
            // created from the viewService.
            this.viewService = viewService;
        },
        // A view might have a function that returns the rendered output.
        getView: function(key) {
            console.log('CORE: viewBase getView() called');
            try {
                this.view = this.getValue(key);
                console.log('CORE: viewBase this.view:');
                console.log(this.view);
                return this.view;
            }
            catch(e) {
                console.log('CORE: viewBase getView(key) error:');
                console.log(e);
                return;
            }
        },
        renderView: function (elementId) {
            console.log('CORE: viewBase renderView(elementId) called');
            console.log('elementId = ' + elementId);
            try {
                document.getElementById(elementId).innerHTML = this.getView('htmlSource');
                var templates = this.getValue('templates')[0];
                console.log("CORE: templates = ");
                console.log(templates);
                for(key in templates) {
                    var templateTag = document.createElement('script');
                    // Add the templates of the view
                    templateTag.type = "text/template";
                    templateTag.id = key; // Use key value from templates collection as the id
                    templateTag.innerHTML = templates[key];
                    console.log("CORE: template templateTag = ");
                    console.log(templateTag);
                    document.getElementsByTagName('templates')[0].appendChild(templateTag);
                }
                // Add the scriptSource of the view
                var scriptTag = document.createElement('script');
                scriptTag.type = "text/javascript";
                scriptTag.src = this.getValue('scriptSource');
                document.getElementsByTagName('head')[0].appendChild(scriptTag);
            }
            catch(e) {
                console.log('CORE: viewBase renderView(elementId) error:');
                console.log(e);
            }
        }
    };
    return viewBase;
});
