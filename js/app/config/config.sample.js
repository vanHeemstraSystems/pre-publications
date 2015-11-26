/*
 * Config
 */
define(['./Base'], function (Base) {
    console.log('CORE: config called');
    var configs = {
    app_list: {
      'calculator': {
        views: {
          calculator: {
            result: 0,
            htmlSource: '<div id="#header" style="font-family: Tahoma, sans-serif;font-size: 3.0em;"><span class="title first">Your</span>&nbsp;<span class="title second">Company<span class="separator"/><span class="subtitle">Calculator</span></div><div id="wrapper"><div id="content"><ul id="listdisplay" class="clearfix"><li class="clearfix"><form class="calc"><p class="calc-display"><input type="text" name="res" id="res" value="" class="calc-display-input" onfocus="this.blur()"></p><p class="calc-row"><button type="button" class="calc-button calc-button-gray" onclick="s(\'Just....\')">mrc</button><button type="button" class="calc-button calc-button-gray" onclick="s(\'....do..\')">m-</button><button type="button" class="calc-button calc-button-gray" onclick="s(\'......it\')">m+</button><button type="button" class="calc-button calc-button-red calc-button-big" onclick="a(\'/\')">÷</button></p><p class="calc-row"><button type="button" class="calc-button" onclick="a(\'7\')">7</button><button type="button" class="calc-button" onclick="a(\'8\')">8</button><button type="button" class="calc-button" onclick="a(\'9\')">9</button><button type="button" class="calc-button calc-button-red calc-button-big" onclick="a(\'*\')">x</button></p><p class="calc-row"><button type="button" class="calc-button" onclick="a(\'4\')">4</button><button type="button" class="calc-button" onclick="a(\'5\')">5</button><button type="button" class="calc-button" onclick="a(\'6\')">6</button><button type="button" class="calc-button calc-button-red calc-button-big" onclick="a(\'-\')">-</button></p><p class="calc-row"><button type="button" class="calc-button" onclick="a(\'1\')">1</button><button type="button" class="calc-button" onclick="a(\'2\')">2</button><button type="button" class="calc-button" onclick="a(\'3\')">3</button><button type="button" class="calc-button calc-button-red calc-button-big" onclick="a(\'+\')">+</button></p><p class="calc-row"><button type="button" class="calc-button" onclick="a(\'0\')">0</button><button type="button" class="calc-button" onclick="a(\'.\')">.</button><button type="button" class="calc-button" onclick="s(\'\')">C</button><button type="button" class="calc-button calc-button-yellow calc-button-big" onclick="e()">=</button></p></form></li></ul></div></div>',
            scriptSource: 'js/calculator/views/calculator/calculator.js',
            subscriptions: [
              {
                channel: 'calculator',
                topic: 'doneCalculate'
              }
            ]
          }
        },
        models: {
          individual: {
            someKey: 'someValue',
            scriptSource: 'js/calculator/models/individual/individual.js',
            subscriptions: [
              {
                channel: 'calculator',
                topic: 'doCalculate'
              }
            ]
          }
        }
      },
      'slider': {
        views: {
          slideOne: {
            htmlSource: '<span>Slide One</span><img src="http://localhost:2000/themes/mydefaulttheme/img/deal.png" />',
            scriptSource: 'js/slider/views/slideOne/slideOne.js',
            subscriptions: [
              {
                channel: 'slideshow',
                topic: 'doneSlide'
              }
            ]
          },
          slideTwo: {
            htmlSource: '<span>Slide Two</span>',
            scriptSource: 'js/slider/views/slideTwo/slideTwo.js',
            subscriptions: [
              {
                channel: 'slider',
                topic: 'doneSlide'
              }
            ]
          },
          slideThree: {
            htmlSource: '<span>Slide Three</span>',
            scriptSource: 'js/slider/views/slideThree/slideThree.js',
            subscriptions: [
              {
                channel: 'slider',
                topic: 'doneSlide'
              }
            ]
          }
        },
        models: {
          individual: {
            someKey: 'someValue',
            scriptSource: 'js/slider/models/individual/individual.js',
            subscriptions: [
              {
                channel: 'slider',
                topic: 'doSlide'
              }
            ]
          }
        }
      },
      'todo': {
        views: {
          todo: {
            htmlSource: '<span>ToDo</span>',
            scriptSource: 'js/todo/views/todo/todo.js',
            subscriptions: [
              {
                channel: 'todo',
                topic: 'doneToDo'
              }
            ]
          }
        },
        models: {
          individual: {
            someKey: 'someValue',
            scriptSource: 'js/todo/models/individual/individual.js',
            subscriptions: [
              {
                channel: 'todo',
                topic: 'doToDo'
              }
            ]
          }
        }
      },
      'quizengine': {
        views: {
          quizengine: {
            htmlSource: '<div class="navbar navbar-fixed-top bs-docs-nav" role="banner"></div><!-- Header starts --><header data-region="header" class="navbar navbar-inverse navbar-fixed-top"><div class="container"><div class="navbar-header"><a href="#list" class="navbar-brand">Quiz Engine</a></div></div></header><!-- Header ends --><!-- Main content starts --><div class="content"><div class="container"><section id="appBody" data-region="body" class="row"></section></div></div><!-- Content ends --><!-- Footer starts --><footer data-region="footer" class="row"><p class="col-xs-12 text-muted">Copyright &copy; 2013 Joe Zimmerman. This is an example application used in the book, <em>A Thorough Introduction to MarionetteJS</em>.</p></footer><!-- Footer ends --><!-- Scroll to top --><span class="totop"><a href="#"><i class="fa fa-chevron-up"></i></a></span><templates></templates>',
            templates: [
              {
                'quizlist-quizzes': '<div class="col-xs-12"><div><a href="#new-quiz" class="btn btn-primary">Start a New Quiz</a></div><h3>Quizzes</h3><table class="table table-striped"><thead><tr><th class="col-xs-6">Quiz</th><th class="col-xs-3">Score</th><th class="col-xs-3">Actions</th></tr></thead><tbody data-item-view-container></tbody></table></div>',
                'quizlist-quiz': '<td class="lead"><%= name %></td><td><%= score() %></td><td><a href="#quiz/<%= id() %>" class="btn btn-link col-xs-12 col-sm-6"><%= viewAction() %></a><button data-action="delete" class="btn btn-link col-xs-12 col-sm-6">Delete</button></td>',
                'quizlist-noquizzes': '<td colspan="3" class="text-center">You have no quizzes here. Click the "Start a New Quiz" button to kick things off!</td>',
                'quizcreator-form': '<div class="col-xs-12"><h3>Create a Quiz</h3><form><div class="form-group row"><label for="quizName" class="col-xs-4 col-sm-2">Quiz Name</label><div class="col-xs-8 col-sm-10"><input class="form-control" id="quizName" type="text" value="Quiz"></div></div><div class="form-group row"><label class="col-xs-4 col-sm-2">Question Categories</label><div class="col-xs-8 col-sm-10"><p class="help-block">Choose at least one category below. Your quiz will be comprised of all the questions from each of the categories selected.</p><% _.each(items, function(category) { %><div class="checkbox"><label><input type="checkbox" value="<%= category.id %>"> <%= category.name %></label></div><% }); %></div></div></form><button data-action="start" class="btn btn-primary">Start Quiz</button><a href="#list" class="btn btn-default">Cancel</a></div>',
                'quiz-quiz': '<div class="col-xs-12"><h3><%= name %></h3><div data-region="quizData"></div></div>',
                'quiz-quiz404': '<div class="col-xs-12 text-center"><h3>This Quiz Does Not Exist</h3><p><a href="#list">Return to Your Quizzes</a></p></div>',
                'quiz-quizreview': '<div class="col-xs-12 col-sm-4"><div class="row"><h4 class="col-xs-4 col-sm-12 text-center">Correct: <%= getCorrect() %></h4><h4 class="col-xs-4 col-sm-12 text-center">Total: <%= getTotal() %></h4><h4 class="col-xs-4 col-sm-12 text-center">Score: <%= getScore() %></h4></div></div><div class="col-xs-12 col-sm-8"><table class="table"><thead><th class="col-xs-4">Question</th><th class="col-xs-4">Correct</th></thead><tbody><% _.each(questions, function(question, index) { %><tr><td><%= index + 1 %></td><td><% if (isCorrect(question.id)) { %><span class="glyphicon glyphicon-ok green"></span><% } else { %><span class="glyphicon glyphicon-remove red"></span><% } %></td></tr><% }); %></tbody></table></div>',
                'quiz-quizquestion': '<p><strong><%= questionNumber() %>. </strong><%= question.text %></p><form id="form"><% _.each(question.answers, function(answer, index) { %><div class="radio"><label><input type="radio" name="answers" value="<%= index %>"><%= answer.text %></label></div><% }); %><button class="btn btn-primary" data-action="next"><%= isLastQuestion() ? "Finish Quiz" : "Next Question" %></button></form>'
              }
            ],
            scriptSource: 'js/quizengine/views/quizengine/quizengine.js',
            subscriptions: [
              {
                channel: 'quizengine',
                topic: 'doneQuizEngine'
              }
            ]
          }
        },
        models: {
          answer: {
            someKey: 'someValue',
            scriptSource: 'js/quizengine/models/answer/answer.js',
            subscriptions: [
              {
                channel: 'quizengine',
                topic: 'doQuizEngine'
              }
            ]
          },
          answers: {
            someKey: 'someValue',
            scriptSource: 'js/quizengine/models/answers/answers.js',
            subscriptions: [
              {
                channel: 'quizengine',
                topic: 'doQuizEngine'
              }
            ]
          }
        }
      }, // eof quizengine
      'booklibrary': {
        views: {
          booklibrary: {
            htmlSource: '<div class="navbar navbar-fixed-top bs-docs-nav" role="banner"></div><!-- Header starts --><header data-region="header" class="navbar navbar-inverse navbar-fixed-top"><div class="container"><div class="navbar-header"><a href="#list" class="navbar-brand">Book Library</a></div></div></header><!-- Header ends --><!-- Main content starts --><div class="content"><div class="container"><section id="appBody" data-region="body" class="row"><div id="books"><div class="widget wgreen"><div class="widget-head"><div class="pull-left">Add books</div><div class="widget-icons pull-right"><a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a><a href="#" class="wclose"><i class="fa fa-times"></i></a></div><div class="clearfix"></div></div><div class="widget-content"><div class="padd"><br /><!-- Form starts.  --><form id="addBook" action="#" class="form-horizontal" role="form"><fieldset><div class="form-group"><label class="col-lg-2 control-label" for="coverImage">CoverImage: </label><div class="col-lg-5"><input id="coverImage" type="file"/></div></div><div class="form-group"><label class="col-lg-2 control-label" for="title">Title: </label><div class="col-lg-5"><input id="title" type="text" class="form-control"  placeholder="Title"/></div></div><div class="form-group"><label class="col-lg-2 control-label" for="author">Author: </label><div class="col-lg-5"><input id="author" type="text" class="form-control" placeholder="Author"/></div></div><div class="form-group"><label class="col-lg-2 control-label" for="releaseDate">Release date: </label><div class="col-lg-5"><input id="releaseDate" type="text" class="form-control" placeholder="Release Date"/></div></div><div class="form-group"><label class="col-lg-2 control-label" for="keywords">Keywords: </label><div class="col-lg-5"><input id="keywords" type="text" class="form-control" placeholder="Keywords"/></div></div><div class="form-group"><div class="col-lg-offset-2 col-lg-6"><button id="add" class="btn btn-sm btn-default">Add</button></div></div></fieldset></form></div></div><div class="widget-foot"><!-- Footer goes here --></div></div></div></section></div></div><!-- Content ends --><!-- Footer starts --><footer data-region="footer" class="row"><p class="col-xs-12 text-muted">Copyright &copy; 2012 CodeByExample. This is an example application used in the blog, <em><a href="http://codebyexample.info/2012/03/06/backbone-baby-steps/">Backbone in baby steps</a></em>.</p></footer><!-- Footer ends --><!-- Scroll to top --><span class="totop"><a href="#"><i class="fa fa-chevron-up"></i></a></span><templates></templates>',
            templates: [
              {
                'bookTemplate': '<img src="<%= coverImage %>"/><ul><li><%= title %></li><li><%= author %></li><li><%= releaseDate %></li><li><%= keywords %></li></ul><button class="delete">Delete</button>'
              }
            ],
            scriptSource: 'js/booklibrary/views/booklibrary/booklibrary.js',
            subscriptions: [
              {
                channel: 'booklibrary',
                topic: 'doneBookLibrary'
              }
            ]
          }
        },
        models: {
          book: {
            someKey: 'someValue',
            scriptSource: 'js/booklibrary/models/book/book.js',
            subscriptions: [
              {
                channel: 'booklibrary',
                topic: 'doBookLibrary'
              }
            ]
          },
          library: {
            someKey: 'someValue',
            scriptSource: 'js/booklibrary/models/library/library.js',
            subscriptions: [
              {
                channel: 'booklibrary',
                topic: 'doBookLibrary'
              }
            ]
          }
        }
      } // eof booklibrary
    }
  };
    var _Config = new Base(configs);
    return _Config;
});
