
app.controller("AddClientCtrl", function($scope, $location, $rootScope, DataFactory, AuthFactory) {
	$scope.newClients = {
        name: "",
        email: "",
        phone:"",
        address: ""
    };
      
    $scope.addNewClient = function(){
        DataFactory.postNewClient($scope.newClients)
            .then(function successCallback(response) {
                console.log(response);
                $location.url("/client-list");
            });
    };
});


