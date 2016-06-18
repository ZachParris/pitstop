
app.controller("AddClientCtrl", function($scope, $location, DataFactory) {
	
    $scope.newClients = {
        name: "",
        email: "",
        phone:"",
        address: "",
        uid: ""
    };
      
    $scope.addNewClients = function(){
        console.log($scope.newClients.email);
        DataFactory.postNewClient($scope.newClients)
            .then(function successCallback(response) {
                console.log("resp", response);
                $location.url("/client-list");
            });
    };

    $scope.test = function() {
        console.log("help");
    };
    $scope.test();
  
});


