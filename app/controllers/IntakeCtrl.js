app.controller("IntakeCtrl", function($scope, $location, $routeParams, $rootScope, DataFactory) {
	$scope.title = "Intake";
    $scope.submitButtonText = "Submit";
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
        date: "",
        id: $routeParams.id
    };

    $scope.addNewJob = function(){
        DataFactory.postNewJob($scope.newJob)
            .then((response) => {
                $location.url(`/client/${$routeParams.id}`);
                console.log("response", response);
                $scope.$apply();
            });
    };

});