app.controller("ClientDetailCtrl", function($scope, $routeParams, $location, DataFactory) {
	$scope.title = "Welcome Back!";
    $scope.submitButtonText = "Add New Job";
    $scope.clients = [];
    $scope.selectedClient = {};
    console.log($routeParams.id);

     DataFactory.getClientList().then(function(itemCollection){
        console.log("itemCollection from promise", itemCollection);
        $scope.clients = itemCollection; 

        $scope.selectedClient = $scope.clients.filter(function(client){
      return client.id === $routeParams.id;
    })[0];
        console.log("selectedItem", $scope.selectedClient);
    });


    var displaySelectedClient = function(selectedClient) {
      console.log("selectedClient", selectedClient);
      if($location.path() === `/client/${$routeParams.id}`){
        DataFactory.getSingleClient($routeParams.id).then(function(data) {
          console.log("data", data);
          $scope.selectedClient = data;
        }); 
      }
    };

    displaySelectedClient();


});
 
