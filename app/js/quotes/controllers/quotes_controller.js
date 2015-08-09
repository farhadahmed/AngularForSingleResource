'use strict';

module.exports = function(app) {
  app.controller('quotesController', ['$scope', '$http', function($scope, $http) {
    $scope.quotes = [];
    $scope.errors = [];

    $scope.getAll = function() {
      $http.get('/api/quotes')
        .then(function(res) {
          //success
          $scope.quotes = res.data;
        }, function(res) {
          //error
          $scope.errors.push({msg: 'could not retrieve quotes from server.'});
          console.log(res.data);
        });
    };

    $scope.create = function(quote) {
      $scope.newQuote = null; //This will clear the input box on submission
      $http.post('/api/quotes', quote)
        .then(function(res) {
          $scope.quotes.push(res.data);
          quote = null; //Remember, null is an object. Objects are passed to functions by reference.
        }, function(res) {
          console.log(res.data);
          $scope.errors.push(res.data);
        });
    };

    $scope.destroy = function(quote) {
      $http.delete('/api/quotes/' + quote._id)
        .then(function(res) {
          $scope.quotes.splice($scope.quotes.indexOf(quote),1);
        }, function(res) {
          console.log(res.data);
          $scope.errors.push(res.data);
        });
    };

    $scope.update = function(quote) {
      $http.put('api/quotes/' + quote._id, quote)
        .then(function(res) {
          quote.editing = false;
        }, function(res) {
          quote.editing = false;
          console.log(res.data);
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
