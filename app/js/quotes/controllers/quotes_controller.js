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
  }]);
};
