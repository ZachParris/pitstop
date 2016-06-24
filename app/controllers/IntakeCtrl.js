app.controller("IntakeCtrl", function($scope, $location, $routeParams, $rootScope, DataFactory) {
	$scope.title = "Intake";
    $scope.submitButtonText = "Submit";
    $scope.newClientWorkOrder = [];
    $scope.workOrder = {
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
        date: "",
        id: $routeParams.id
    };
 
    $scope.addWorkOrder = function(){
        DataFactory.postClientJob($scope.newClientWorkOrder)
            .then((response) => {
                $location.url(`#/client/${$routeParams.id}`);
                console.log("response", response);
                $scope.$apply($scope.newClientWorkOrder);
            });
    };

  	$scope.displayWorkOrders = function(data) {
	    DataFactory.getClientJob().then(function(data){
	      $scope.workOrder = data;
	      console.log(data);
	    })
	  };

  	$scope.displayClientWorkOrder = function(clientId) {
	    DataFactory.getClientJob().then(function(response) {
	      response.forEach(function(newClientWorkOrder) {
	        if (clientId === $scope.newClientWorkOrder.id) {
	        	console.log("clientId", response);
	          $scope.workOrder = $scope.newClientWorkOrder;
	        } 
	        $location.path(`/client/${$rootScope.workOrder.id}`);
	      })
	      console.log(response);
	    })
	  };

  	$scope.displayWorkOrders();

});