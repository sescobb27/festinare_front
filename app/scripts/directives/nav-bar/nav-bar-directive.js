'use strict';

angular.module('festinare').
directive('navBar', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/nav-bar/nav-bar.html'
  };
});
