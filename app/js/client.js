'use strict';

require('angular/angular');
require('./services/services');
require('./directives/directives');

var quotesApp = angular.module('quotesApp', ['services', 'directives']);

require('./quotes/quotes')(quotesApp);
