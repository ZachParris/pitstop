"use strict";

app.controller("ClientListCtrl", function($scope, $location, $rootScope, $routeParams, DataFactory){
    $scope.title = "Registered Clients";
    $scope.submitButtonText = "Add New";
    $rootScope.clientListShow = false;
    $rootScope.clientLogoutShow = true;
    $rootScope.clientAddShow = true;
    $scope.clients = [];


    DataFactory.getClientList().then(function(itemCollection){
        console.log("itemCollection from promise", itemCollection);
        $scope.clients = itemCollection;
    });

    $scope.clientSelect = function(){
    DataFactory.getSingleClient($routeParams.id)
        .then(function successCallback(response){
            $scope.clients=response;
            $scope.currentClient = $scope.clients.filter(function(client){
            return client.id === $routeParams.id;
        })[0];
        });
        DataFactory.getSingleClient($routeParams.id);
        
    };

  
    $scope.clientDelete = function(currentClient){
        DataFactory.deleteClient(currentClient).then(function(){
            DataFactory.getClientList().then(function(data) {
                $scope.clients = data;
                $scope.$apply();
                }
            );
        });
    };

    $scope.inputChange = function(item){
        DataFactory.updateClientInfo(item)
            .then(function(response){
            });
    };

    $scope.displayClients = function() {
        if($location.path() === "/client/list"){
            DataFactory.getClientList().then(function(data) {
            $scope.clients = [];
                $scope.clients = data;
            });
        }
        };
            $scope.displayClients();
    
    });