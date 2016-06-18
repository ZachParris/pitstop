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
    console.log("helllooo");
    AuthFactory
      .authenticate($scope.account)
      .then(() => {
        DataFactory.getClientList().then(function(data) {
          let clients = [];     
          $scope.clients = data;
          console.log("clients", $scope.clients.length);
          if($scope.clients.length === 0){
            console.log("#");
            $rootScope.addClientShow = false;
            $rootScope.findClientShow = true;
            $location.url("/client/add");
          }else{
            console.log("yeah");
            $rootScope.addClientShow = true;
            $rootScope.findClientShow = false;
            console.log("root", $rootScope.addClientShow);
            $location.url("/client/list");
          };
        $scope.$apply();
        });
      });
  };
});