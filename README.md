# Meteor Ionic Basic Accounts Demo
###This tutorial shows the integration of [angular-meteor](http://www.angular-meteor.com/) with the [Ionic Framework](http://ionicframework.com/) for creating user accounts and logging in with them. This can be the start of your full-stack, cross-platform mobile solution
![https://github.com/aaronksaunders/meteor-ionic-demo2/blob/master/screenshots/Screenshot-Login.png](https://github.com/aaronksaunders/meteor-ionic-demo2/blob/master/screenshots/Screenshot-Login.png)

![https://github.com/aaronksaunders/meteor-ionic-demo2/blob/master/screenshots/Screenshot-Home.png](https://github.com/aaronksaunders/meteor-ionic-demo2/blob/master/screenshots/Screenshot-Home.png)

###Create a blank ionic project
```Console
ionic start meteorIonic2 blank
```

Now lets modify the `index.html` to support the views we will be creating. Replace the entire `body` tag with the code below. This is where the templates identified in the `ui-router` will be rendered based on the specified route.
```HTML
<body ng-app="starter">
  <ion-nav-view></ion-nav-view>
</body>
```
###Create login/create account page
We are going to keep this simple with a basic login screen and a basic profile screen. The focus here is really on the integration with meteor and less on the specifics of ionic and html templates in AngularJS.

Create a new directory called `views`

Create a new file in the `views` directory named `login.html`; add the following code
```HTML
<ion-view title="Login User" hide-back-button=true>
  <ion-content class="padding">
    <ion-item class="card padding">
      <div class="item-text-wrap padding">
        Enter User Name and Password to Login to Application
      </div>

      <label class="item item-input">
        <input type="text" ng-model="credentials.username" placeholder="UserName" />
      </label>
      <label class="item item-input">
        <input type="password" ng-model="credentials.password" placeholder="Password" />
      </label>
      <div class="padding">
        <button class="button button-block" ng-click="doLoginAction()">Login</button>
        <button class="button button-block" ng-click="doCreateAccountAction()">Create Account</button>
      </div>
    </ion-item>
  </ion-content>
</ion-view>
```
Once again for simplicity we are create and account unsing just a username and password. This way we can use just one html page and one controller to support the effort.

We have created the `$scope` object for holding the credentials and included functions to be called when the user clicks on the login or create account button. `doLoginAction` and `doCreateAccountAction`. You will see the code for those functions in the `LoginCtrl` which will be created in an upcoming section.

###Create User Information Page
The home/user information page will be visible when the user is logged in only. It will show the user information and have a logout button for the user to end the current session

```Html
<!-- HTML FOR home template -->
<ion-view title="Ionic Meteor Sample 1" hide-back-button=true>
  <ion-nav-bar>
  <ion-nav-buttons side="secondary">
    <button class="button" ng-click="doLogoutAction()">
      Logout
    </button>
  </ion-nav-buttons>
</ion-nav-bar>
  <ion-content class="padding">
    <ion-item class="card">
      <div class="item-text-wrap padding">
        You Are Logged Into the Application
      </div>
    </ion-item>
  </ion-content>
</ion-view>
```
We have created the `$scope` object for holding the credentials and included functions to be called when the user clicks on the logout button, `doLogoutAction`.You will see the code for this function in the `HomeCtrl` which will be created in an upcoming section.

###Create Basic Routing
Inside of the `app.js` file add the config block for routing. We have two states here, one for the login page and one for the home page. At this point there is no authentication just specific routes to access.
```Javascript
  .config(function($stateProvider, $urlRouterProvider) {

      // For any unmatched url, send to /login
      $urlRouterProvider.otherwise("/login");

      $stateProvider
        .state('login', {
          url: '/login',
          // loaded into ui-view of parent's template
          templateUrl: 'views/login.html',
          controller : 'LoginCtrl'
        })
        .state('home', {
          url: '/home',
          // loaded into ui-view of parent's template
          templateUrl: 'home.html',
          controller: 'HomeCtrl'
        })
    });
```
###Create the Controllers
We will create a new file called `controllers.js`, in the file add the code for the two controllers specified above. To verify the application flow from the click events, we will make the buttons call the appropriate functions and alert the users to the behavior.
```Javascript
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
```
We have added simple alerts to indicate the appropriate function was called with a slight delay before transitioning to the correct state.

Now lets modify the `index.html` to support the controllers we just added. Include the new script tag to add the controllers to the application.
```HTML
  <!-- your app's js -->
  <script src="js/app.js"></script>
  <script src="js/controllers.js"></script> // <== ADD THIS LINE
```
At this point the application should run and show the flow between the states. The next steps will start to add the Meteor user functionality to the application.

###Create the Meteor Part of Application

#####Add the required meteor bower packages

```Console
bower install meteor-client-side angular-meteor accounts-base-client-side accounts-password-client-side --save-dev
```
Make the edits to the `index.html` to include the javascript library files from the angular-meteor and to support the accounts package for creating user accounts and logging into an application
```HTML
  <!-- angular-meteor stuff -->
  <script src="lib/meteor-client-side/meteor-runtime-config.js"></script>
  <script src="lib/meteor-client-side/dist/meteor-client-side.bundle.min.js"></script>
  <script src="lib/angular-meteor/dist/angular-meteor.bundle.min.js"></script>
  <script src="lib/accounts-base-client-side/dist/accounts-base-client-side.bundle.js"></script>
  <script src="lib/accounts-password-client-side/dist/accounts-password-client-side.bundle.min.js"></script>
```
#####Create the meteor server
create the meteor server directory by running the command in the project root directory
```Console
meteor create server
cd server
del server.*
```
#####Changes to the client application
Add the directive to `app.js`
```
angular.module('starter', ['ionic','angular-meteor'])
```
Now lets inject the `$meteor` object into the controllers, add to start of `LoginCtrl` function
```Javascript
  LoginCtrl.$inject = ['$scope', '$state', '$meteor'];
```
then add to start of `HomeCtrl` function
```Javascript
  HomeCtrl.$inject = ['$scope', '$state', '$meteor'];
```
###Load all of the meteor client side packages
change back to the server directory and run the following command
```Console
meteor add accounts-base accounts-password
```
Now the supported packages are added to your server, you can restart your server by running the meteor command
```Console
meteor
```
##Revisiting the Router for Authentication Checks
what we will need to do is check for a valid user object when attempting to access a specified route. We can use the routers `resolve` functionality here to check if a user exists. If a user does not exist, a `stateChangeError` is thrown and we can redirect to the login state.

Add the user check on the route using the `requireUser` method from the `angular-meteor` API. Change the `home` state to look like this
```Javascript
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
```
When this code is run, if there is no logged in user, the `$meteor.requireUser()` call will reject the promise and the `stateChangeError` will be thrown. We can catch the error by adding the following code to the run function in `app.js`.

First update the function to include the `$rootScope`
```Javascript
.run(function($ionicPlatform, $rootScope) {
```
Then add the listener for the `$stateChangeError`
```Javascript
// checking for errors in state change
$rootScope.$on('$stateChangeError',
  function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch when the $requireUser promise is rejected and redirect to login state
    if (error === 'AUTH_REQUIRED') {
      event.preventDefault();
      console.log("no user");
      $state.go('login');
    }
  });
```
This should force the user to the `login` state when there is no user; now lets use meteor and the accounts package to add a user.
[Meteor Documentation on creating a user](http://docs.meteor.com/#/full/accounts_createuser)

The source code to add to the `doCreateAccountAction` in the `LoginCtrl` will call the meteor function to create a user and then redirect back to the `home` state. If this all worked out fine, a user should be present and the home state should be rendered.
```Javascript
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
      alert("user created: " + $scope.credentials.username );
      $state.go('home');
    }, function(_error) {
      console.log('Login error - ', _error);
      alert("Error: " + _error.reason);
    });
    return false;
  }
```
Now to login a created user, lets add the following source code to the `doLoginAction` in the `LoginCtrl` will call the meteor function to login a user and then redirect back to the `home` state. If this all worked out fine, a user should be present and the home state should be rendered.

[Meteor documentation for logging in user with password](http://docs.meteor.com/#/full/meteor_loginwithpassword)

```Javascript
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
```
Lets update the `home.html` to show the information on the user that is created or logged in
```HTML
<!-- HTML FOR home template -->
<ion-view title="Ionic Meteor Sample 1" hide-back-button=true>
  <ion-nav-bar>
    <ion-nav-buttons side="secondary">
      <button class="button" ng-click="doLogoutAction()">
        Logout
      </button>
    </ion-nav-buttons>
  </ion-nav-bar>
  <ion-content class="padding">
    <ion-item class="card">
      <div class="item-text-wrap padding">
        <h2>You Are Logged Into the Application:</h2>
        <p>
          <!-- the currentUser is added to the $rootScope -->
          <pre style="font-size:smaller"> {{currentUser | json}} </pre>
        </p>
      </div>
    </ion-item>
  </ion-content>
</ion-view>
```
Now that we have meteor integrated and we can login user, lets finishup the logout function for the `HomeCtrl`.

[Meteor Documentation on Logout](http://docs.meteor.com/#/full/meteor_logout)

Here is the code to add to the `HomeCtrl` in the file `controllers.js`
```Javascript
  $scope.doLogoutAction = function() {
    alert("in doLogoutAction");
    $meteor.logout().then(function(_response) {
      $state.go('login');
    });
  };
```
