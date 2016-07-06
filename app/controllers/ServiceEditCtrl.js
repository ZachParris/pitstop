  "use strict";

app.controller("ServiceEditCtrl", function($scope, $window, $location, $rootScope, $routeParams, DataFactory) {
  $scope.title = "Update";
  $scope.submitButtonText = "Update";
  // $rootScope.selectedClient;
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
      let workOrderId = $routeParams.id;
      let clientId = $rootScope.selectedClient.uid;
      console.log("clientId", $rootScope.selectedClient.uid);
      console.log("workOrderId", $routeParams.id);
      DataFactory.updateJobData(workOrderId, $scope.workOrder, clientId)
            .then(function successCallback(response) {
                console.log(response);
                $window.location.assign(`/#/client/${clientId}`);
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
