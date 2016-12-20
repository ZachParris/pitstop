"use strict";
app.controller('LoginCtrl', function($scope, $rootScope, $location, firebaseURL, AuthFactory, DataFactory){

  $scope.account = {
    email: "",
    password: ""
  };

  if($location.path() === "/logout") {
    firebase.auth().signOut;
    $rootScope.isActive = false;
    $rootScope.addClientShow = false;
    $rootScope.findClientShow = false;
    $rootScope.clientLogoutShow = true;
  }

  $scope.register = () => {
    console.log("you clicked register");
    console.log($scope.account.email);
    AuthFactory.registerWithEmail({
      email: $scope.account.email,
      password: $scope.account.password
    }, (error, userData) => {
      if (error) {
        console.log(`Error creating user: ${error}`);
      } else{
        console.log(`Created user account with uid: ${userData.uid}`);
        $scope.login();
      }
    });
  };


  $scope.login = () => {
    AuthFactory
      .authenticate($scope.account)
      .then(() => {
        DataFactory.getClientList().then(function(data) {
          $scope.clients = data;
          $rootScope.isActive = true;
          $rootScope.clientListShow = true;
          $rootScope.clientLogoutShow = true;
          if($scope.clients.length === 0){
            console.log("#");
            $rootScope.clientAddShow = true;
            $rootScope.clientListShow = false;
            $location.url("/client/add");
          }else{
            $rootScope.clientAddShow = true;
            $rootScope.clientListShow = false;
            $location.url("/client/list");
          }
        $scope.$apply();
        });
      });
  };
});
