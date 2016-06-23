app.controller("IntakeCtrl", function($scope, $location, $rootScope, DataFactory) {
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
        date: ""
    };

    $scope.addNewJob = function(){
        DataFactory.postNewJob($scope.newJob)
            .then((response) => {
                $location.url("/client/:id");
                console.log("response", response);
                $scope.$apply();
            });
    };

});