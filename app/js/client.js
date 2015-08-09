'use strict';

require('angular/angular');

var quotesApp = angular.module('quotesApp', []);

require('./quotes/quotes')(quotesApp);
