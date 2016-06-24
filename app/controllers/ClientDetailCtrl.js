"use strict";

app.controller("ClientDetailCtrl", function($scope, $routeParams, $rootScope, $location, DataFactory) {
    $scope.title = "Welcome Back!";
    $scope.submitButtonText = "Add New Job";
    $rootScope.clientListShow = true;
    $rootScope.clientLogoutShow = true;
    $rootScope.clientAddShow = false;
    $scope.clients = [];
    $scope.selectedClient = [];
    $scope.workOrder = [];
    $scope.clientWorkOrder = [];


    DataFactory.getClientList().then(function(itemCollection) {
        console.log("itemCollection from promise", itemCollection);
        $scope.clients = itemCollection;

        $scope.selectedClient = $scope.clients.filter(function(client) {
            return client.id === $routeParams.id;
        })[0];
        console.log("selectedItem", $scope.selectedClient);
    });



    var displaySelectedClient = function(selectedClient) {
        if ($location.path() === `/client/${$routeParams.id}`) {
            DataFactory.getSingleClient($routeParams.id).then(function(data) {
                console.log("data", data);
                $scope.selectedClient = data;
            });

        }
    };

    displaySelectedClient();

    $scope.addWorkOrder = function(data) {
        if ($location.path() === `/client/${$routeParams.id}`) {
            DataFactory.getClientJob($scope.routeParam.id).then(function(data) {
              console.log("dataCollection", data); 
              $scope.workOrder = dataCollection;
            });
        }
        $scope.$apply();
    };

    $scope.displayWorkOrders = function(data) {
    DataFactory.getClientJob().then(function(data){
      $scope.workOrder = data;
      console.log(data);
    });
  };

  // $scope.displayClientWorkOrder = function(clientOrderId) {
  //   DataFactory.getClientJob().then(function(response) {
  //     response.forEach(function(job) {
  //       if (clientOrderId === job.id) {
  //         $rootScope.clientWorkOrder = job;
  //       } else {
  //         console.log("not working");
  //       }
  //       $location.path(`/client/${$rootScope.clientWorkOrder.id}`);
  //     })
  //     console.log(response);
  //   })
  // };

  // displayWorkOrders();





});
 

    