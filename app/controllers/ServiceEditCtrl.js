"use strict";

app.controller("ServiceEditCtrl", function($scope, $window, $location, $routeParams, DataFactory) {
  $scope.title = "Edit";
  $scope.submitButtonText = "Update";
  $scope.workOrder = [];
  $scope.selectedJob = {};

    DataFactory.getSingleClient().then(function(jobCollection){
          console.log("jobCollection", jobCollection);
            $scope.workOrder = jobCollection;

            $scope.selectedJob = $scope.workOrder.filter(function(job) {
                return job.id === $routeParams.id;
            })[0];
        });

        console.log("workOrder", $scope.workOrder);

        // var displaySelectedJob = function() {
        //   if($location.path() === `/client/${$routeParams.id}`){
        //     DataFactory.getSingleClient($routeParams.id).then(function(data) {
        //       console.log("data", data);
        //       $scope.selectedClient = data;
        //     });
        //   }
        // };
        //
        // displaySelectedJob();

    $scope.addWorkOrder = function(){
      DataFactory.updateJobData($routeParams.clientId, $scope.workOrder)
            .then(function successCallback(response) {
                console.log(response);
                $window.location.assign(`/#/client/${$routeParams.id}`);
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
