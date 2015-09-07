'use strict';

angular
  .module('festinare', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'ngFileUpload',
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    // $locationProvider.html5Mode(true);

    $stateProvider
      .state('index', {
        url: '/'
      })
      .state('login', {
        url: '/client/auth/login',
        templateUrl: 'scripts/client/auth/login.html',
        controller: 'ClientAuthCtrl'
      })
      .state('register', {
        url: '/client/auth/register',
        templateUrl: 'scripts/client/auth/register.html',
        controller: 'ClientAuthCtrl'
      })
      .state('dashboard', {
        url: '/client/dashboard',
        templateUrl: 'scripts/client/dashboard/dashboard.html',
        controller: 'ClientDashboardCtrl',
        auth: true
      })
      .state('profile', {
        url: '/client/profile',
        templateUrl: 'scripts/client/profile/profile.html',
        controller: 'ProfileCtrl',
        auth: true
      })
      .state('about-us', {
        url: '/about-us',
        templateUrl: 'scripts/application/about-us.html'
      })
      .state('contact-us', {
        url: '/contact-us',
        templateUrl: 'scripts/application/contact-us.html'
      })
      .state('pricing', {
        url: '/pricing',
        templateUrl: 'scripts/pricing/pricing.html',
        controller: 'PricingCtrl'
      })
      .state('support', {
        url: '/support',
        templateUrl: 'scripts/application/support.html'
      });

    $httpProvider.interceptors.push('AuthInterceptor');
  })
  .factory('AuthInterceptor', function ($rootScope, $q, SessionService, $location, $injector) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        // console.log('REQUEST: ', config);
        var session = SessionService.getCurrentSession();
        if (session) {
          config.headers.Authorization = 'Bearer ' + session;
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        console.log('RESPONSE ERROR:', response);
        if (response.status === 401) {
          var $state = $injector.get('$state');
          $rootScope.$emit('logout');
          $state.go('login');
          $rootScope.$emit('alert', {
            msg: 'You are not authorized to enter here, please Log In'
          });
          // remove any state tokens
        }
        return $q.reject(response);
      }
    };
  })
  .run(function ($rootScope, $state, AuthService) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (next.auth) {
        AuthService.isLoggedIn().then(function (logged_in) {
          if (!logged_in) {
            console.log('NO LOGGED IN');
            $state.go('login');
            event.preventDefault();
          }
        });
      }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
      $state.previous = fromState;
    });

    $rootScope.$on('logout', function () {
      AuthService.logout();
    });
  });
