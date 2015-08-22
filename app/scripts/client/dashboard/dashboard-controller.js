'use strict';

angular.module('festinare')
  .controller('ClientDashboardCtrl', function ($scope, $rootScope, AuthService, DiscountService, $mdDialog) {

    var formatDiscountUntilDate = function (discount) {
      var tmp = new Date(discount.created_at);
      return new Date(tmp.getTime() + (discount.duration * 60000));
    };

    $scope.isLoading = true;
    AuthService.getCurrentUser().then(function (client) {
      $scope.client = client;
      DiscountService.getDiscounts(client.id).then(function (res) {
        $scope.client.discounts = res.discounts;
        angular.forEach($scope.client.discounts, function (discount) {
          discount.until_date = formatDiscountUntilDate(discount);
        });
        if ( client.clients_plans && client.clients_plans.length > 0) {
          $scope.current_plan = client.clients_plans[0];
        }
        $scope.isLoading = false;
      }).catch(function (error) {
        $scope.isLoading = false;
        $rootScope.$emit('alert', { msg: error.data.errors.join(' ') });
      });
    });

    $scope.hashtags = function (hashtags) {
      return hashtags ? hashtags.join(' ') : '';
    };

    $scope.createDiscount = function ($event) {
      $mdDialog.show({
        templateUrl: 'scripts/client/dashboard/discount/new-discount-modal.html',
        controller: 'DiscountCtrl',
        targetEvent: $event
      }).then(function(discount) {
        discount.until_date = formatDiscountUntilDate(discount);
        $scope.client.discounts.push(discount);
        $scope.current_plan.num_of_discounts_left--;
      });
    };

  });
