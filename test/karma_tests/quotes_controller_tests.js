'use strict';
require('../../app/js/client.js');
require('angular-mocks');

describe('quotes controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('quotesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var quotesController = $ControllerConstructor('quotesController', {$scope: $scope});
    //expect(typeof quotesController).toBe('object');
    expect(typeof $scope.getAll).toBe('function');
    expect(Array.isArray($scope.quotes)).toBe(true);
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('quotesController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request when getAll is called', function() {
      $httpBackend.expectGET('/api/quotes').respond(200, [{quoteBody: 'test quote', _id:1}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.quotes.length).toBe(1);
      expect($scope.quotes[0].quoteBody).toBe('test quote');
      expect($scope.quotes[0]._id).toBe(1);
    });

    it('should make a post request when create is called', function() {
      var testQuote = {quoteBody: 'test quote'};
      $scope.newQuote = testQuote;
      expect($scope.quotes.length).toBe(0);
      $httpBackend.expectPOST('/api/quotes', testQuote).respond(200, {quoteBody: 'test create quote', _id: 1});
      $scope.create(testQuote);
      expect($scope.newQuote).toBe(null);
      $httpBackend.flush();
      expect($scope.quotes.length).toBe(1);
      expect($scope.quotes[0].quoteBody).toBe('test create quote');
    });

    it('should make a put request when update is called', function() {
      var quote = {_id: 1, editing: true};
      $httpBackend.expectPUT('/api/quotes/1', quote).respond(200);
      $scope.update(quote);
      $httpBackend.flush();
      expect(quote.editing).toBe(false);
    });

    it('should make a delete request when destroy is called', function() {
      var quote = {_id: 1, quoteBody: 'test quote'};
      $scope.quotes = [{quoteBody: 'some quote', _id: 2}, quote, {quoteBody: 'another test quote', _id: 3}];
      $httpBackend.expectDELETE('/api/quotes/1').respond(200);
      $scope.destroy(quote);
      $httpBackend.flush();
      expect($scope.quotes.length).toBe(2);
      expect($scope.quotes.indexOf(quote)).toBe(-1);
      expect($scope.quotes[0].quoteBody).toBe('some quote');
      expect($scope.quotes[1].quoteBody).toBe('another test quote');
    });
  });
});
