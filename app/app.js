"use strict";

var app = angular.module('PitstopApp', ["ngRoute"])
  .constant("firebaseURL", "https://pitstop-app-zp.firebaseio.com/");

  let isAuth = (AuthFactory) => new Promise((resolve, reject) => {

  if (AuthFactory.isAuthenticated()) {
    console.log("User is authenticated.");
    resolve();
  } else {
    console.log("User is not authenticated.");
    reject();
  }

});


app.config(function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'partials/clientList.html',
    controller: "ClientListCtrl",
    resolve: {
      isAuth
    }
  }).
  when('/client/list', {
    templateUrl: 'partials/clientList.html',
    controller: "ClientListCtrl",
    resolve: {
      isAuth
    }
  }).
  when('/client/add', {
    templateUrl: 'partials/addClient.html',
    controller: "AddClientCtrl",
    resolve: {
      isAuth
    }
  }).
  when('/intake', {
    templateUrl: 'partials/intakeView.html',
    controller: "IntakeCtrl",
    resolve: {
      isAuth
    }
  }).
  when('/client/edit/:id', {
    templateUrl: 'partials/addClient.html',
    controller: "EditClientCtrl",
    resolve: {
      isAuth
    }
  }).
  when('/client/:id', {
    templateUrl: 'partials/clientDetails.html',
    controller: "ClientDetailCtrl",
    resolve: {
      isAuth
    }
  }).
  when('/intake/:id', {
    templateUrl: 'partials/intakeView.html',
    controller: "IntakeCtrl",
    resolve: {
      isAuth
    }
  }).
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: "LoginCtrl"
  }).
  when('/logout', {
    templateUrl: 'partials/login.html',
    controller: "LoginCtrl"
  }).
  otherwise('/');
});

app.run(($location) => {

  let clientListRef = new Firebase("https://pitstop-app-zp.firebaseio.com/");
  clientListRef.unauth();

  clientListRef.onAuth(authData => {
    if (!authData) {
      $location.path("/login");
    }
  });
  });
