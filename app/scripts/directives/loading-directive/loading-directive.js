'use strict';

/**
 * @ngdoc directive
 * @description
 * # geocodeDirective
 */
angular.module('festinare')
  .directive('loading', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/loading-directive/loading.html'
    };
  });
