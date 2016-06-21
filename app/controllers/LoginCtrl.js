"use strict";
app.controller('LoginCtrl', function($scope, $rootScope, $location, firebaseURL, AuthFactory, DataFactory){
  let ref = new Firebase(firebaseURL);


  $scope.account = {
    email: "",
    password: ""
  };

  if($location.path() === "/logout") {
    ref.unauth();
  }

  $scope.register = () => {
    console.log("you clicked register");
    ref.createUser({
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
          let clients = [];     
          $scope.clients = data;
          if($scope.clients.length === 0){
            console.log("#");
            $rootScope.addClientShow = false;
            $rootScope.findClientShow = true;
            $location.url("/client/add");
          }else{
            $rootScope.addClientShow = true;
            $rootScope.findClientShow = false;
            $location.url("/client/list");
          };
        $scope.$apply();
        });
      });
  };
});