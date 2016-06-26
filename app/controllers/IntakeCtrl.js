"use strict";

app.controller("IntakeCtrl", function($scope, $location, $routeParams, $window, $rootScope, DataFactory) {
	$scope.title = "Intake";
    $scope.submitButtonText = "Submit";
    $scope.newClientWorkOrder = [];
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
    $scope.workOrders = [];

 
    $scope.addWorkOrder = function(){
        DataFactory.postClientJob($scope.workOrder, $routeParams.id)
            .then((response) => {
                console.log("response", response);
                $scope.$apply($scope.newClientWorkOrder);
                $location.url(`/client/${$routeParams.id}`);
                $scope.$apply();
            });
    };


});