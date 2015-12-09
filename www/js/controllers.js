angular
  .module('starter')
  .controller('LoginCtrl', LoginCtrl)
  .controller('HomeCtrl', HomeCtrl);

function LoginCtrl($scope, $state, $meteor) {

  LoginCtrl.$inject = ['$scope', '$state', '$meteor'];

  $scope.credentials = {};

  $scope.doLoginAction = function() {
    $meteor.loginWithPassword($scope.credentials.username, $scope.credentials.password)
      .then(function() {
        console.log('Login success ');
        alert("logged in: " + $scope.credentials.username);
        $state.go('home');
      }, function(_error) {
        console.log('Login error - ', _error);
        alert("Error: " + _error.reason);
      });
    return false;
  }

  $scope.doCreateAccountAction = function() {
    alert("in doCreateAccountAction");
    $meteor.createUser({
      username: $scope.credentials.username,
      email: $scope.credentials.username,
      password: $scope.credentials.password,
      profile: {
        createdOn: new Date()
      }
    }).then(function(_response) {
      console.log('doCreateAccountAction success');
      alert("user created: " + $scope.credentials.username);
      $state.go('home');
    }, function(_error) {
      console.log('Login error - ', _error);
      alert("Error: " + _error.reason);
    });
    return false;
  }
}

function HomeCtrl($scope, $state, $meteor) {

  HomeCtrl.$inject = ['$scope', '$state', '$meteor'];

  $scope.doLogoutAction = function() {
    alert("in doLogoutAction");
    $meteor.logout().then(function(_response) {
      $state.go('login');
    });
  };

}
