"use strict";
app.controller("AddClientCtrl", function($scope, $location, DataFactory) {
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
                // DataFactory.getClientList();
            });
    };
});


