  "use strict";

app.controller("ServiceEditCtrl", function($scope, $window, $location, $routeParams, DataFactory) {
  $scope.title = "Update";
  $scope.submitButtonText = "Update";
  $scope.workOrder = {
      metals: "",
      stones: "",
      size: "",
      value: "",
      description: "",
      centerStones:"",
      prongs: "",
      shanks:"",
      other: "",
      price: "",
      date: ""
  };

    DataFactory.getWorkOrders().then(function(jobCollection){
          console.log("jobCollection", jobCollection);
            $scope.workOrder = jobCollection;

            $scope.workOrder = $scope.workOrder.filter(function(job) {
                return job.id === $routeParams.id;
            })[0];
        });

        console.log("workOrder", $scope.workOrder);


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
