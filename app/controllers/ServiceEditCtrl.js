"use strict";

app.controller("ServiceEditCtrl", function($scope, $window, $location, $routeParams, DataFactory) {
  $scope.title = "Edit";
  $scope.submitButtonText = "Update";
  $scope.workOrder = {};

    DataFactory.getSingleJob($routeParams.clientId)
        .then(function successCallback(response){
          console.log("singlejob response", response);
            $scope.workOrder=response;
        });

        console.log($scope.workOrder);

    $scope.addWorkOrder = function(){
      DataFactory.updateJobData($routeParams.clientId, $scope.workOrder)
            .then(function successCallback(response) {
                console.log(response);
                $window.location.assign(`/#/client/${$scope.clientId}`);
            });
    };

    $scope.workOrderDelete = function(currentJob) {
          DataFactory.deleteJob(currentJob).then(function() {
            DataFactory.getWorkOrderList().then(function(data) {
              $scope.clients = data;
              $scope.$apply();
            });
          });
        };

  });
