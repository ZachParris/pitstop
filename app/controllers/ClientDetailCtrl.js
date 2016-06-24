app.controller("ClientDetailCtrl", function($scope, $routeParams, $location, DataFactory) {
	$scope.title = "Welcome Back!";
    $scope.submitButtonText = "Add New Job";
    $scope.clients = [];
    $scope.selectedClient = [];
    $scope.workOrder = [];


     DataFactory.getClientList().then(function(itemCollection){
        console.log("itemCollection from promise", itemCollection);
        $scope.clients = itemCollection; 

        $scope.selectedClient = $scope.clients.filter(function(client){
      return client.id === $routeParams.id;
    })[0];
        console.log("selectedItem", $scope.selectedClient);
    });

    //  DataFactory.getClientJob().then(function(jobCollection){
    //     console.log("jobCollection from promise", jobCollection);
    //     $scope.workOrder = jobCollection; 
    // });

    $scope.addWorkOrder = function(){
        DataFactory.getClientJob($scope.workOrder)
            .then((response) => { 
                $location.path(`/client/list`);
                console.log("response", response);
                $scope.$apply();
            });
    };

    var displaySelectedClient = function(selectedClient) {
      if($location.path() === `/client/${$routeParams.id}`){
        DataFactory.getSingleClient($routeParams.id).then(function(data) {
          console.log("data", data);
          $scope.selectedClient = data;
        }); 
      }
    };

    displaySelectedClient();


     var displayClientJobs = function(workOrder){
      if($location.path() === `/client/${$routeParams.id}`){
        DataFactory.getClientJob($routeParams.id).then(function(jobData) {
          console.log("jobData", jobData);
          $scope.workOrder = jobData;
        });
      }
    };

    displayClientJobs();

});
 
