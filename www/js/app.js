// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['angular-meteor', 'ionic'])

.run(function($ionicPlatform, $rootScope, $state) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    // checking for errors in state change
    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the login
        if (error === 'AUTH_REQUIRED') {
          event.preventDefault();
          console.log("no user");
          $state.go('login');
        }
      });
  })
  .config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('login', {
        url: '/login',
        // loaded into ui-view of parent's template
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('home', {
        url: '/home',
        // loaded into ui-view of parent's template
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        resolve: {
          "currentUser": function($meteor) {
            return $meteor.requireUser();
          }
        }
      })
  });
