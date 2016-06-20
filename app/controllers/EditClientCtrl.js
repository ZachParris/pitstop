app.controller("EditClientCtrl", function($scope, $location, $routeParams, DataFactory) {
	$scope.title = "Update Client Info";
    $scope.submitButtonText = "Update";
    $scope.clientUpdate = {};

    DataFactory.getSingleClient($routeParams.itemId)
        .then(function successCallback(response){
            $scope.clientUpdate=response;
        });
      
    $scope.updateClientInfo = function(){
        DataFactory.updateClient($routeParams.itemId, $scope.clientUpdate)
            .then(function successCallback(response) {
                console.log(response);
                $location.url("/client/edit/:id");
            });
    };
});