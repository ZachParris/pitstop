app.controller("ClientDetailCtrl", function($scope, $routeParams, $location, DataFactory) {
	$scope.title = "Welcome Back!";
    $scope.submitButtonText = "Add New Job";
    $scope.clients = [];
    $scope.selectedClient = {};
    $scope.newJob = {
      metal: "",
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


     DataFactory.getClientList().then(function(itemCollection){
        console.log("itemCollection from promise", itemCollection);
        $scope.clients = itemCollection; 

        $scope.selectedClient = $scope.clients.filter(function(client){
      return client.id === $routeParams.id;
    })[0];
        console.log("selectedItem", $scope.selectedClient);
    });

    $scope.addNewJob = function(){
        DataFactory.postNewJob($scope.newJob)
            .then((response) => {
                $location.url("/client/:id");
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


});
 
