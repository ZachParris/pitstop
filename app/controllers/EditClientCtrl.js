app.controller("EditClientCtrl", function($scope, $location, $routeParams, DataFactory) {
	$scope.title = "Update Client Info";
    $scope.submitButtonText = "Update";
    $scope.clientUpdate = {
    	name: "",
        email: "",
        phone:"",
        address: "",
        uid: ""
    };

    DataFactory.getSingleClient($routeParams.id)
        .then(function successCallback(response){
            $scope.clientUpdate=response;
        });
      
    $scope.updateClientInfo = function(){
        DataFactory.updateClient($routeParams.id, $scope.clientUpdate)
            .then(function successCallback(response) {
                console.log(response);
                $location.url("/client/edit/" + $routeParams.id);
            });
    };

     $scope.addNewClients = function(){
        DataFactory.postNewClient($scope.newClients)
            .then((response) => {
                $location.url("/client/list");
                console.log("response", response);
            });
    };
});