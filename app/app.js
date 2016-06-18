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
  when('/clients/client-list', {
    templateUrl: 'partials/clientList.html',
    controller: "ClientListCtrl",
    resolve: {
      isAuth
    }
  }).
  when('/add-client', {
    templateUrl: 'partials/addClient.html',
    controller: "AddClientCtrl",
    resolve: {
      isAuth
    }
  }).
  when('/clients/intake', {
    templateUrl: 'partials/intakeView.html',
    controller: "WatchListCtrl",
    resolve: {
      isAuth
    }
  }).
  when('/clients/client-details', {
    templateUrl: 'partials/clientDetails.html',
    controller: "ClientDetailCtrl",
    resolve: {
      isAuth
    }
  }).
  when('/clients/service-details', {
    templateUrl: 'partials/serviceDetails.html',
    controller: "ServiceDetailCtrl",
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

  let watchlistRef = new Firebase("https://pitstop-app-zp.firebaseio.com/");
  watchlistRef.unauth();

  watchlistRef.onAuth(authData => {
    if (!authData) {
      $location.path("/login");
    }
  })
  });
