
app.controller("AddClientCtrl", function($scope, $location, $rootScope, DataFactory, AuthFactory) {
	$scope.newClients = {
        name: "",
        email: "",
        phone:"",
        address: ""
    };
      
    $scope.addNewClient = function(){
        DataFactory.postNewClient($scope.newClients.name, $scope.newClients.email, $scope.newClients.phone, $scope.newClients.address)
            .then(function successCallback(response) {
                console.log(response);
                $location.url("/client-list");
            });
    };
});


