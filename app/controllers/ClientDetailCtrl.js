"use strict";

app.controller("ClientDetailCtrl", function($scope, $routeParams, $rootScope, $location, DataFactory) {
    $scope.title = "Welcome Back!";
    $scope.submitButtonText = "Add New Job";
    $rootScope.clientListShow = true;
    $rootScope.clientLogoutShow = true;
    $rootScope.clientAddShow = false;
    $scope.clients = [];
    $scope.selectedClient = {};
    $scope.$watch($scope.selectedClient);
    $scope.workOrder = [];
    $scope.clientWorkOrder = [];


    DataFactory.getClientList().then(function(itemCollection) {
        console.log("itemCollection from promise", itemCollection);
        $scope.clients = itemCollection;

        $scope.selectedClient = $scope.clients.filter(function(client) {
            return client.id == $routeParams.id;
        })[0];
        console.log("selectedClient", $scope.selectedClient);
    });

    console.log("DataFactory.getWorkOrders", DataFactory.getWorkOrders());

    $scope.addWorkOrder = function() {
        if ($location.path() === `/client/${$routeParams.id}`) {
            DataFactory.getWorkOrders($scope.routeParam.id).then(function(data) {
              console.log("dataCollection", data); 
              $scope.workOrder = data;
            });
        }
        $scope.$apply();
    };

    $scope.displayWorkOrders = function() {
    DataFactory.getWorkOrders().then(function(data){
      $scope.workOrder = data;
      console.log(data);
    });
  };

  $scope.displayClientWorkOrder = function(clientOrderId) {
    DataFactory.getWorkOrders().then(function(response) {
      response.forEach(function(job) {
        if (clientOrderId === job.id) {
          $rootScope.clientWorkOrder = job;
        } else {
          console.log("not working");
        }
        $location.path(`/client/${$rootScope.clientWorkOrder.id}`);
      })
      console.log(response);
    })
  };

  $scope.displayWorkOrders();





});
 

    