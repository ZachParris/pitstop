app.controller("IntakeCtrl", function($scope, $location, $routeParams, $rootScope, DataFactory) {
	$scope.title = "Intake";
    $scope.submitButtonText = "Submit";
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
        DataFactory.postClientJob($scope.workOrder)
            .then((response) => {
                $location.url(`/client/${$routeParams.id}`);
                console.log("response", response);
                $scope.$apply($scope.workOrder);
            });
    };

});