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
    $rootScope.currentClientJobs = [];


    DataFactory.getClientList().then(function(itemCollection) {
        console.log("itemCollection from promise", itemCollection);
        $scope.clients = itemCollection;

        $scope.selectedClient = $scope.clients.filter(function(client) {
            return client.id === $routeParams.id;
        })[0];
    });


    $scope.addWorkOrder = function() {
        if ($location.path() === `/client/${$routeParams.id}`) {
            DataFactory.getWorkOrders($scope.routeParams.id).then(function(data) {
              console.log("dataCollection", data); 
              $scope.workOrder = data;
            });
        }
        $scope.$apply();
    };


  $scope.displayClientWorkOrders = function(clientId) {
      DataFactory.getWorkOrders().then(function(response) {
      $rootScope.currentClientJobs = [];
        response.forEach(function(job) {
        console.log(response);
        if (job.clientId === $routeParams.id) {
          console.log("yes");
          $rootScope.currentClientJobs.push(job);
          $scope.$apply();
        } 
      });
      console.log(response);
    });
  };

  $scope.displayClientWorkOrders($routeParams.id);





});
 

    