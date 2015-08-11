'use strict';

module.exports = function(app) {
  app.directive('dummyDirective', function() {
    return {
      restrict: 'CA', //CA is for class or attribute
      template: '<h2>Add some awesome quotes!</h2>'
    };
  });
}
