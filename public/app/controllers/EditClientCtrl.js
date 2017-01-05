"use strict";

app.controller("EditClientCtrl", function($scope, $rootScope, $location, $window, $routeParams, DataFactory) {
    $scope.title = "Update Client Info";
    $scope.submitButtonText = "Update";
    $rootScope.clientListShow = true;
    $rootScope.clientLogoutShow = true;
    $rootScope.clientAddShow = true;
    $scope.newClients = {};
    $scope.selectedClient = [];
    $scope.clients = [];


    DataFactory.getClientList().then(function(itemCollection) {
        console.log("itemCollection from promise", itemCollection);
        $scope.clients = itemCollection;

        $scope.newClients = $scope.clients.filter(function(client) {
            return client.id === $routeParams.id;
        })[0];
        console.log("selectedItem", $scope.newClients);
    });

    
    var displaySelectedClient = function() {
      if($location.path() === `/client/edit/${$routeParams.id}`){
        DataFactory.getSingleClient($routeParams.id).then(function(data) {
          console.log("data", data);
          $scope.selectedClient = data;
        }); 
      }
    };

    displaySelectedClient();

    $scope.addNewClients = function() {
        DataFactory.updateClientInfo($routeParams.id, $scope.newClients)
            .then((response) => {
                $window.location.assign("/#/client/list");
                console.log("response", response);
            });
    };
});