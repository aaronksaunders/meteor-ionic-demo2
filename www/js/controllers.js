angular
  .module('starter')
  .controller('LoginCtrl', LoginCtrl)
  .controller('HomeCtrl', HomeCtrl);

function LoginCtrl($scope, $state) {

  $scope.doLoginAction = function($scope) {
    alert("in doLoginAction");
    setTimeout(function() {
      $state.go('home');
    }, 1000);
  }

  $scope.doCreateAccountAction = function() {
    alert("in doCreateAccountAction");
    setTimeout(function() {
      $state.go('home');
    }, 1000);
  }
}

function HomeCtrl($scope, $state) {
  $scope.doLogoutAction = function() {
    alert("in doLogoutAction");
    setTimeout(function() {
      $state.go('login');
    }, 1000);
  }

}
