'use strict';

module.exports = function(app) {
  app.controller('quotesController', ['$scope', 'RESTResource', function($scope, resource) {
    $scope.quotes = [];
    $scope.errors = [];
    var Quote = new resource('quotes');

    $scope.getAll = function() {
      Quote.getAll(function(err, data) {
        if (err) return $scope.errors.push({msg: 'error getting quotes'});
        $scope.quotes = data;
      });
    };

    $scope.create = function(quote) {
      $scope.newQuote = null; //This will clear the input box on submission
      Quote.save(quote, function(err, data) {
        if (err) return $scope.errors.push({msg: 'could not save quote: ' + quote.quoteBody});
        $scope.quotes.push(data);
      });
        //quote = null; //Remember, null is an object. Objects are passed to functions by reference.
    };

    $scope.destroy = function(quote) {
      Quote.destroy(quote, function(err, data) {
        if (err) return $scope.errors.push({msg: 'could not delete quote: ' + quote.quoteBody});
        $scope.quotes.splice($scope.quotes.indexOf(quote),1);
      });
    };

    $scope.update = function(quote) {
      Quote.update(quote, function(err, data) {
        if (err) return $scope.errors.push({msg: 'could not update quote: ' + quote.quoteBody});
        quote.editing = false;
      });
    };

    $scope.edit = function(quote) {
      quote.editing = true; //Tyler had written this in view but I feel keeping it in controller is cleaner
      quote.startingBody = quote.quoteBody;
    };

    $scope.cancelEdit = function(quote) {
      quote.editing = false;
      quote.quoteBody = quote.startingBody;
    };

  }]);
};
