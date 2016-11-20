"use strict";
app.controller("AddClientCtrl", function($scope, $location, $rootScope, DataFactory) {
    $scope.title = "New Client";
    $scope.submitButtonText = "Add New";
    $rootScope.clientListShow = true;
    $rootScope.clientLogoutShow = true;
    $rootScope.clientAddShow = false;
    $scope.newClients = {
        name: "",
        email: "",
        phone:"",
        address: "",
        uid: ""
    };
      
    $scope.addNewClients = function(){
        DataFactory.postNewClient($scope.newClients)
            .then((response) => {
                $location.url("/client/list");
                console.log("response", response);
                $scope.$apply();
            });
    };
});


