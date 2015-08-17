'use strict';

angular.module('festinare').
  directive('footerBar', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'scripts/directives/footer-bar/footer-bar.html'
    };
  });
