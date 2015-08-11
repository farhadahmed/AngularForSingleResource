'use strict';

require('angular/angular');
require('./services/services');

var quotesApp = angular.module('quotesApp', ['services']);

require('./quotes/quotes')(quotesApp);
