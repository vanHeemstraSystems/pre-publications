/*
* MainBase
*/
define(function () {
  console.log('CORE: mainBase called');
  function mainBase(id, require) {
    this.id = id;
    this.require = require;
    var $ = require('jquery'),
    jquery = require('jquery'), // jquery before backbone
    underscore = require('underscore'), // underscore before backbone
    backbone = require('backbone'), // backbone before marionette
    //    marionette = require('backbone.marionette'), // marionette extends backbone
    lodash = require('lodash'),
    bootstrap = require('bootstrap'), // bootstrap extends jquery
    expect = require('expect'),
    mocha = require('mocha'),
    jquerypp = require('jquerypp.custom'),
    framewarp = require('framewarp');
    this.models = []; // object to contain models
    this.views = []; // object to contain views
  };
  mainBase.prototype = {
    setLib: function(lib) {
      console.log('CORE: mainBase setLib(lib) called');
      this.lib = lib;
    },
    setConfig: function(config) {
      console.log('CORE: mainBase setConfig(config) called');
      this.config = config;
    },
    setController: function(controller) {
      console.log('CORE: mainBase setController(controller) called');
      this.controller = controller;
    },
    setAppName: function(appName) {
      console.log('CORE: mainBase setAppName(appName) called: appName =');
      console.log(appName);
      this.appName = appName;
    },
    setElementId: function(elementId) {
      console.log('CORE: mainBase setElementId(elementId) called: elementId =');
      console.log(elementId);
      this.elementId = elementId;
    },
    setModel: function(model) {
      console.log('CORE: mainBase setModel(model) called');
      this.model = model;
    },
    setModelController: function(modelController) {
      console.log('CORE: mainBase setModelController(modelController) called');
      this.modelController = modelController;
    },
    setModelService: function(modelService) {
      console.log('CORE: mainBase setModelService(modelService) called');
      this.modelService = modelService;
    },
    setModelEvent: function(modelEvent) {
      console.log('CORE: mainBase setModelEvent(modelEvent) called');
      this.modelEvent = modelEvent;
    },
    setModelIndex: function(modelIndex) {
      console.log('CORE: mainBase setModelIndex(modelIndex) called');
      this.modelIndex = modelIndex;
    },
    loadModel: function(modelIndex) {
      console.log('CORE: mainBase loadModel(modelIndex) called');
      this.controller.loadModel(modelIndex);
    },
    renderModel: function() {
      console.log('CORE: mainBase renderModel() called');
      this.controller.renderModel();
    },
    setServiceBus: function(serviceBus) {
      console.log('CORE: mainBase setServiceBus(serviceBus) called');
      this.serviceBus = serviceBus;
    },
    setView: function(view) {
      console.log('CORE: mainBase setView(view) called');
      this.view = view;
    },
    setViewTemplate: function(viewTemplate) {
      console.log('CORE: mainBase setViewTemplate(viewTemplate) called');
      this.viewTemplate = viewTemplate;
    },
    setViewController: function(viewController) {
      console.log('CORE: mainBase setViewController(viewController) called');
      this.viewController = viewController;
    },
    setViewService: function(viewService) {
      console.log('CORE: mainBase setViewService(viewService) called');
      this.viewService = viewService;
    },
    setViewEvent: function(viewEvent) {
      console.log('CORE: mainBase setViewEvent(viewEvent) called');
      this.viewEvent = viewEvent;
    },
    setViewIndex: function(viewIndex) {
      console.log('CORE: mainBase setViewIndex(viewIndex) called');
      this.viewIndex = viewIndex;
    },
    loadView: function(viewIndex) {
      console.log('CORE: mainBase loadView(viewIndex) called');
      this.controller.loadView(viewIndex);
    },
    renderView: function(elementId) {
      console.log('CORE: mainBase renderView(elementId) called');
      this.controller.renderView(elementId);
    },
    readyController: function(me, callback) {
      console.log('CORE: mainBase readyController(me, callback) called');
      var err = null;
      if(typeof me.controller === 'undefined') {
        me.require(['../app/controller/controller'], function (controller) {
          console.log('CORE: mainBase: controller required');
          console.log(controller);
          me.controller = controller;
          callback(me, err, me.controller);
        });
      }
      else {
        me.controller = me.controller;
        console.log(me.controller);
        callback(me, err, me.controller);
      }
    },
    readyConfig: function(me, callback) {
      console.log('CORE: mainBase readyConfig(me, callback) called');
      var err = null;
      if(typeof me.config === 'undefined') {
        me.require(['../app/config/config'], function (config) {
          console.log('CORE: mainBase: config required');
          console.log(config);
          me.config = config;
          callback(me, err, me.config);
        });
      }
      else {
        me.config = me.config;
        console.log(me.config);
        callback(me, err, me.config);
      }
    },
    readyPage: function(me, callback) {
      console.log('CORE: mainBase readyPage(me, callback) called');
      var err = null;
      if(typeof me.page === 'undefined') {
        me.require(['../app/page/page'], function (page) {
          console.log('CORE: mainBase: page required');
          console.log(page);
          me.page = page;
          callback(me, err, me.page);
        });
      }
      else {
        me.page = me.page;
        console.log(me.page);
        callback(me, err, me.page);
      }
    },
    readyPageController: function(me, callback) {
      console.log('CORE: mainBase readyPageController(me, callback) called');
      var err = null;
      if(typeof me.pageController === 'undefined') {
        me.require(['../app/pageController/pageController'], function (pageController) {
          console.log('CORE: mainBase: pageController required');
          console.log(pageController);
          me.pageController = pageController;
          callback(me, err, me.pageController);
        });
      }
      else {
        me.pageController = me.pageController;
        console.log(me.pageController);
        callback(me, err, me.pageController);
      }
    },
    readyPageRouter: function(me, callback) {
      console.log('CORE: mainBase readyPageRouter(me, callback) called');
      var err = null;
      if(typeof me.pageRouter === 'undefined') {
        me.require(['../app/pageRouter/pageRouter'], function (pageRouter) {
          console.log('CORE: mainBase: pageRouter required');
          console.log(pageRouter);
          me.pageRouter = pageRouter;
          callback(me, err, me.pageRouter);
        });
      }
      else {
        me.pageRouter = me.pageRouter;
        console.log(me.pageRouter);
        callback(me, err, me.pageRouter);
      }
    },
    readyServiceBus: function(me, callback) {
      console.log('CORE: mainBase readyServiceBus(me, callback) called');
      var err = null;
      if(typeof me.serviceBus === 'undefined') {
        me.require(['../app/serviceBus/serviceBus'], function (serviceBus) {
          console.log('CORE: mainBase: serviceBus required');
          console.log(serviceBus);
          me.serviceBus = serviceBus;
          callback(me, err, me.serviceBus);
        });
      }
      else {
        me.serviceBus = me.serviceBus;
        console.log(me.serviceBus);
        callback(me, err, me.serviceBus);
      }
    },
    readyModelController: function(me, callback) {
      console.log('CORE: mainBase readyModelController(me, callback) called');
      var err = null;
      if(typeof me.modelController === 'undefined') {
        me.require(['../app/modelController/modelController'], function (modelController) {
          console.log('CORE: mainBase: modelController required');
          console.log(modelController);
          me.modelController = modelController;
          callback(me, err, me.modelController);
        });
      }
      else {
        me.modelController = me.modelController;
        console.log(me.modelController);
        callback(me, err, me.modelController);
      }
    },
    readyModelService: function(me, callback) {
      console.log('CORE: mainBase readyModelService(me, callback) called');
      var err = null;
      if(typeof me.modelService === 'undefined') {
        me.require(['../app/modelService/modelService'], function (modelService) {
          console.log('CORE: mainBase: modelService required');
          console.log(modelService);
          me.modelService = modelService;
          callback(me, err, me.modelService);
        });
      }
      else {
        me.modelService = me.modelService;
        console.log(me.modelService);
        callback(me, err, me.modelService);
      }
    },
    readyModel: function(me, callback) {
      console.log('CORE: mainBase readyModel(me, callback) called');
      var err = null;
      if(typeof me.model === 'undefined') {
        me.require(['../app/model/model'], function (model) {
          console.log('CORE: mainBase: model required');
          console.log(model);
          me.model = model;
          callback(me, err, me.model);
        });
      }
      else {
        me.model = me.model;
        console.log(me.model);
        callback(me, err, me.model);
      }
    },
    readyModelEvent: function(me, callback) {
      console.log('CORE: mainBase readyModelEvent(me, callback) called');
      var err = null;
      if(typeof me.modelEvent === 'undefined') {
        me.require(['../app/modelEvent/modelEvent'], function (modelEvent) {
          console.log('CORE: mainBase: modelEvent required');
          console.log(modelEvent);
          me.modelEvent = modelEvent;
          callback(me, err, me.modelEvent);
        });
      }
      else {
        me.modelEvent = me.modelEvent;
        console.log(me.modelEvent);
        callback(me, err, me.modelEvent);
      }
    },
    readyViewController: function(me, callback) {
      console.log('CORE: mainBase readyViewController(me, callback) called');
      var err = null;
      if(typeof me.viewController === 'undefined') {
        me.require(['../app/viewController/viewController'], function (viewController) {
          console.log('CORE: mainBase: viewController required');
          console.log(viewController);
          me.viewController = viewController;
          callback(me, err, me.viewController);
        });
      }
      else {
        me.viewController = me.viewController;
        console.log(me.viewController);
        callback(me, err, me.viewController);
      }
    },
    readyViewService: function(me, callback) {
      console.log('CORE: mainBase readyViewService(me, callback) called');
      var err = null;
      if(typeof me.viewService === 'undefined') {
        me.require(['../app/viewService/viewService'], function (viewService) {
          console.log('CORE: mainBase: viewService required');
          console.log(viewService);
          me.viewService = viewService;
          callback(me, err, me.viewService);
        });
      }
      else {
        me.viewService = me.viewService;
        console.log(me.viewService);
        callback(me, err, me.viewService);
      }
    },
    readyView: function(me, callback) {
      console.log('CORE: mainBase readyView(me, callback) called');
      var err = null;
      if(typeof me.view === 'undefined') {
        me.require(['../app/view/view'], function (view) {
          console.log('CORE: mainBase: view required');
          console.log(view);
          me.view = view;
          callback(me, err, me.view);
        });
      }
      else {
        me.view = me.view;
        console.log(me.view);
        callback(me, err, me.view);
      }
    },
    readyViewTemplate: function(me, callback) {
      console.log('CORE: mainBase readyViewTemplate(me, callback) called');
      var err = null;
      if(typeof me.viewTemplate === 'undefined') {
        me.require(['../app/viewTemplate/viewTemplate'], function (viewTemplate) {
          console.log('CORE: mainBase: viewTemplate required');
          console.log(viewTemplate);
          me.viewTemplate = viewTemplate;
          callback(me, err, me.viewTemplate);
        });
      }
      else {
        me.viewTemplate = me.viewTemplate;
        console.log(me.viewTemplate);
        callback(me, err, me.viewTemplate);
      }
    },
    readyViewEvent: function(me, callback) {
      console.log('CORE: mainBase readyViewEvent(me, callback) called');
      var err = null;
      if(typeof me.viewEvent === 'undefined') {
        me.require(['../app/viewEvent/viewEvent'], function (viewEvent) {
          console.log('CORE: mainBase: viewEvent required');
          console.log(viewEvent);
          me.viewEvent = viewEvent;
          callback(me, err, me.viewEvent);
        });
      }
      else {
        me.viewEvent = me.viewEvent;
        console.log(me.viewEvent);
        callback(me, err, me.viewEvent);
      }
    },
    ready: function() {
      console.log('CORE: mainBase ready() called');
      var me = this; // contains the current context
      // Controller
      me.readyController(me, function(me, err, controller) {
        if(err) {
          console.log('CORE: mainBase readyController error:');
          console.log(err);
        }
        else {
          console.log('CORE: mainBase ready controller:');
          console.log(controller);
          me.controller = controller;
          // Set appName
          console.log('CORE: mainBase ready me.controller.setAppName(me.appName):');
          // AppName
          if(typeof me.appName === 'undefined') {
            me.appName = 'unknown'; // default
            console.log(me.appName);
            me.controller.setAppName(me.appName);
          }
          else {
            me.appName = me.appName;
            console.log(me.appName);
            me.controller.setAppName(me.appName);
          }
          // Config
          me.readyConfig(me, function(me, err, config) {
            if(err) {
              console.log('CORE: mainBase readyConfig error:');
              console.log(err);
            }
            else {
              console.log('CORE: mainBase ready config:');
              console.log(config);
              me.config = config;
              // Set config
              console.log('CORE: mainBase ready me.controller.setConfig(me.config):');
              // Config
              if(typeof me.config === 'undefined') {
                me.config = {}; // default
                console.log(me.config);
                me.controller.setConfig(me.config);
              }
              else {
                me.config = me.config;
                console.log(me.config);
                me.controller.setConfig(me.config);
              }
              // Page
              me.readyPage(me, function(me, err, page) {
                if(err) {
                  console.log('CORE: mainBase readyPage error:');
                  console.log(err);
                }
                else {
                  console.log('CORE: mainBase ready page:');
                  console.log(page);
                  me.page = page;
                  // Set page
                  console.log('CORE: mainBase ready me.controller.setPage(me.page):');
                  // Page
                  if(typeof me.page === 'undefined') {
                    me.page = {}; // default
                    console.log(me.page);
                    me.controller.setPage(me.page);
                  }
                  else {
                    me.page = me.page;
                    console.log(me.page);
                    me.controller.setPage(me.page);
                  }
                  // PageController
                  me.readyPageController(me, function(me, err, pageController) {
                    if(err) {
                      console.log('CORE: mainBase readyPageController error:');
                      console.log(err);
                    }
                    else {
                      console.log('CORE: mainBase ready pageController:');
                      console.log(pageController);
                      me.pageController = pageController;
                      // Set pageController
                      console.log('CORE: mainBase ready me.controller.setPageController(me.pageController):');
                      // PageController
                      if(typeof me.pageController === 'undefined') {
                        me.pageController = {}; // default
                        console.log(me.pageController);
                        me.controller.setPageController(me.pageController);
                      }
                      else {
                        me.pageController = me.pageController;
                        console.log(me.pageController);
                        me.controller.setPageController(me.pageController);
                      }
                      // PageRouter
                      me.readyPageRouter(me, function(me, err, pageRouter) {
                        if(err) {
                          console.log('CORE: mainBase readyPageRouter error:');
                          console.log(err);
                        }
                        else {
                          console.log('CORE: mainBase ready pageRouter:');
                          console.log(pageRouter);
                          me.pageRouter = pageRouter;
                          // Set pageRouter
                          console.log('CORE: mainBase ready me.controller.setPageRouter(me.pageRouter):');
                          // PageRouter
                          if(typeof me.pageRouter === 'undefined') {
                            me.pageRouter = {}; // default
                            console.log(me.pageRouter);
                            me.controller.setPageRouter(me.pageRouter);
                          }
                          else {
                            me.pageRouter = me.pageRouter;
                            console.log(me.pageRouter);
                            me.controller.setPageRouter(me.pageRouter);
                          }
                          // ServiceBus
                          me.readyServiceBus(me, function(me, err, serviceBus) {
                            if(err) {
                              console.log('CORE: mainBase readyServiceBus error:');
                              console.log(err);
                            }
                            else {
                              console.log('CORE: mainBase ready serviceBus:');
                              console.log(serviceBus);
                              me.serviceBus = serviceBus;
                              // Set serviceBus
                              console.log('CORE: mainBase ready me.controller.setServiceBus(me.serviceBus):');
                              // ServiceBus
                              if(typeof me.serviceBus === 'undefined') {
                                me.serviceBus = {}; // default
                                console.log(me.serviceBus);
                                me.controller.setServiceBus(me.serviceBus);
                              }
                              else {
                                me.serviceBus = me.serviceBus;
                                console.log(me.serviceBus);
                                me.controller.setServiceBus(me.serviceBus);
                              }
                              // ModelController
                              me.readyModelController(me, function(me, err, modelController) {
                                if(err) {
                                  console.log('CORE: mainBase readyModelController error:');
                                  console.log(err);
                                }
                                else {
                                  console.log('CORE: mainBase ready modelController:');
                                  console.log(modelController);
                                  me.modelController = modelController;
                                  // Set modelController
                                  console.log('CORE: mainBase ready me.controller.setModelController(me.modelController):');
                                  // ModelController
                                  if(typeof me.modelController === 'undefined') {
                                    me.modelController = {}; // default
                                    console.log(me.modelController);
                                    me.controller.setModelController(me.modelController);
                                  }
                                  else {
                                    me.modelController = me.modelController;
                                    console.log(me.modelController);
                                    me.controller.setModelController(me.modelController);
                                  }
                                  // ModelService
                                  me.readyModelService(me, function(me, err, modelService) {
                                    if(err) {
                                      console.log('CORE: mainBase readyModelService error:');
                                      console.log(err);
                                    }
                                    else {
                                      console.log('CORE: mainBase ready modelService:');
                                      console.log(modelService);
                                      me.modelService = modelService;
                                      // Set modelService
                                      console.log('CORE: mainBase ready me.controller.setModelService(me.modelService):');
                                      // ModelService
                                      if(typeof me.modelService === 'undefined') {
                                        me.modelService = {}; // default
                                        console.log(me.modelService);
                                        me.controller.setModelService(me.modelService);
                                      }
                                      else {
                                        me.modelService = me.modelService;
                                        console.log(me.modelService);
                                        me.controller.setModelService(me.modelService);
                                      }
                                      // Model
                                      me.readyModel(me, function(me, err, model) {
                                        if(err) {
                                          console.log('CORE: mainBase readyModel error:');
                                          console.log(err);
                                        }
                                        else {
                                          console.log('CORE: mainBase ready model:');
                                          console.log(model);
                                          me.model = model;
                                          // Set model
                                          console.log('CORE: mainBase ready me.controller.setModel(me.model):');
                                          // Model
                                          if(typeof me.model === 'undefined') {
                                            me.model = {}; // default
                                            console.log(me.model);
                                            me.controller.setModel(me.model);
                                          }
                                          else {
                                            me.model = me.model;
                                            console.log(me.model);
                                            me.controller.setModel(me.model);
                                          }
                                          // ModelEvent
                                          me.readyModelEvent(me, function(me, err, modelEvent) {
                                            if(err) {
                                              console.log('CORE: mainBase readyModelEvent error:');
                                              console.log(err);
                                            }
                                            else {
                                              console.log('CORE: mainBase ready modelEvent:');
                                              console.log(modelEvent);
                                              me.modelEvent = modelEvent;
                                              // Set modelEvent
                                              console.log('CORE: mainBase ready me.controller.setModelEvent(me.modelEvent):');
                                              // ModelEvent
                                              if(typeof me.modelEvent === 'undefined') {
                                                me.modelEvent = {}; // default
                                                console.log(me.modelEvent);
                                                me.controller.setModelEvent(me.modelEvent);
                                              }
                                              else {
                                                me.modelEvent = me.modelEvent;
                                                console.log(me.modelEvent);
                                                me.controller.setModelEvent(me.modelEvent);
                                              }
                                              // Subscribe ModelService
                                              console.log('CORE: mainBase ready this.controller.subscribeModelService()');
                                              me.controller.subscribeModelService();
                                              // LoadModel, before renderModel
                                              console.log('CORE: mainBase ready me.controller.loadModel(modelIndex):')
                                              // ModelIndex
                                              if(typeof me.modelIndex === 'undefined') {
                                                me.modelIndex = 0; // default
                                                console.log(me.modelIndex);
                                                me.controller.loadModel(me.modelIndex);
                                              }
                                              else {
                                                me.modelIndex = me.modelIndex;
                                                console.log(me.modelIndex);
                                                me.controller.loadModel(me.loadIndex);
                                              }// oef ModelIndex
                                              // RenderModel, after loadModel
                                              console.log('CORE: mainBase ready me.controller.renderModel():');
                                              me.controller.renderModel();
                                            }
                                          });// eof ModelEvent
                                        }
                                      });// eof Model
                                    }
                                  });// eof ModelService
                                }
                              });// eof ModelController
                              // ViewController
                              me.readyViewController(me, function(me, err, viewController) {
                                if(err) {
                                  console.log('CORE: mainBase readyViewController error:');
                                  console.log(err);
                                }
                                else {
                                  console.log('CORE: mainBase ready viewController:');
                                  console.log(viewController);
                                  me.viewController = viewController;
                                  // Set viewController
                                  console.log('CORE: mainBase ready me.controller.setViewController(me.viewController):');
                                  // ViewController
                                  if(typeof me.viewController === 'undefined') {
                                    me.viewController = {}; // default
                                    console.log(me.viewController);
                                    me.controller.setViewController(me.viewController);
                                  }
                                  else {
                                    me.viewController = me.viewController;
                                    console.log(me.viewController);
                                    me.controller.setViewController(me.viewController);
                                  }
                                  // ViewService
                                  me.readyViewService(me, function(me, err, viewService) {
                                    if(err) {
                                      console.log('CORE: mainBase readyViewService error:');
                                      console.log(err);
                                    }
                                    else {
                                      console.log('CORE: mainBase ready viewService:');
                                      console.log(viewService);
                                      me.viewService = viewService;
                                      // Set viewService
                                      console.log('CORE: mainBase ready me.controller.setViewService(me.viewService):');
                                      // ViewService
                                      if(typeof me.viewService === 'undefined') {
                                        me.viewService = {}; // default
                                        console.log(me.viewService);
                                        me.controller.setViewService(me.viewService);
                                      }
                                      else {
                                        me.viewService = me.viewService;
                                        console.log(me.viewService);
                                        me.controller.setViewService(me.viewService);
                                      }
                                      // View
                                      me.readyView(me, function(me, err, view) {
                                        if(err) {
                                          console.log('CORE: mainBase readyView error:');
                                          console.log(err);
                                        }
                                        else {
                                          console.log('CORE: mainBase ready view:');
                                          console.log(view);
                                          me.view = view;
                                          // Set view
                                          console.log('CORE: mainBase ready me.controller.setView(me.view):');
                                          // View
                                          if(typeof me.view === 'undefined') {
                                            me.view = {}; // default
                                            console.log(me.view);
                                            me.controller.setView(me.view);
                                          }
                                          else {
                                            me.view = me.view;
                                            console.log(me.view);
                                            me.controller.setView(me.view);
                                          }
                                          // ViewEvent
                                          me.readyViewEvent(me, function(me, err, viewEvent) {
                                            if(err) {
                                              console.log('CORE: mainBase readyViewEvent error:');
                                              console.log(err);
                                            }
                                            else {
                                              console.log('CORE: mainBase ready viewEvent:');
                                              console.log(viewEvent);
                                              me.viewEvent = viewEvent;
                                              // Set viewEvent
                                              console.log('CORE: mainBase ready me.controller.setViewEvent(me.viewEvent):');
                                              // ViewEvent
                                              if(typeof me.viewEvent === 'undefined') {
                                                me.viewEvent = {}; // default
                                                console.log(me.viewEvent);
                                                me.controller.setViewEvent(me.viewEvent);
                                              }
                                              else {
                                                me.viewEvent = me.viewEvent;
                                                console.log(me.viewEvent);
                                                me.controller.setViewEvent(me.viewEvent);
                                              } // eof ViewEvent
                                              // Subscribe ViewService
                                              console.log('CORE: mainBase ready me.controller.subscribeViewService()');
                                              me.controller.subscribeViewService();
                                              // LoadView, before renderView
                                              console.log('CORE: mainBase ready me.controller.loadView(viewIndex):')
                                              // ViewIndex
                                              if(typeof me.viewIndex === 'undefined') {
                                                me.viewIndex = 0; // default
                                                console.log(me.viewIndex);
                                                me.controller.loadView(me.viewIndex);
                                              }
                                              else {
                                                me.viewIndex = me.viewIndex;
                                                console.log(me.viewIndex);
                                                me.controller.loadView(me.viewIndex);
                                              }// oef ViewIndex
                                              // RenderView, after loadView
                                              console.log('CORE: mainBase ready me.controller.renderView(elementId):');
                                              // ElementId
                                              if(typeof me.elementId === 'undefined'){
                                                me.elementId = 'unknown'; // default
                                                console.log(me.elementId);
                                                me.controller.renderView(me.elementId);
                                              }
                                              else {
                                                me.elementId = me.elementId;
                                                console.log(me.elementId);
                                                me.controller.renderView(me.elementId);
                                              }// eof ElementId
                                            }
                                          });// eof ViewEvent
                                        }
                                      });// eof View
                                    }
                                  });// eof ViewService
                                }
                              });// eof ViewController
                            }
                          });// eof ServiceBus
                        }
                      });// eof PageRouter
                    }
                  });// eof PageController
                }
              });// eof Page
            }
          });// eof Config
        }
      });// eof Controller
    }// eof ready()
  }; // eof mainBase.prototype
  return mainBase;
});
