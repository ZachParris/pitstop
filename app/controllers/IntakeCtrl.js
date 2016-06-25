"use strict";

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
    $scope.workOrders = [];
 
    $scope.addWorkOrder = function(){
        DataFactory.postClientJob($scope.workOrder)
            .then((response) => {
                $location.url(`#/client/${$routeParams.id}`);
                console.log("response", response);
                $scope.$apply($scope.newClientWorkOrder);
            });
    };

  	$scope.displayWorkOrders = function() {
	    DataFactory.getWorkOrders().then(function(data){
	      $scope.workOrders = data;
	      console.log(data);
	      $scope.$apply();
	    });
	  };

  	$scope.displayClientWorkOrder = function(clientId) {
	    DataFactory.getWorkOrders().then(function(response) {
	      response.forEach(function() {
	        if (clientId === $scope.workOrder.id) {
	        	console.log("clientId", response);
	          $scope.workOrder = $scope.newClientWorkOrder;
	        } 
	      });
	    });
	  };

  	$scope.displayWorkOrders();

});