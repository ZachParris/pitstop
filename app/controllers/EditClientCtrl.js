app.controller("EditClientCtrl", function($scope, $location, $routeParams, DataFactory) {
	$scope.title = "Update Client Info";
    $scope.submitButtonText = "Update";
    $scope.clientUpdate = {};

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

    $scope.postClientUpdate = function(clientUpdate, selectedClient) {
    let user = AuthFactory.getUser();
    return new Promise((resolve, reject) => {
      $http.put(`${firebaseURL}clients${selectedClient.id}.json`,
          JSON.stringify({
            name: clientUpdate.name,
            email: clientUpdate.email,
            phone: clientUpdate.phone,
            address: clientUpdate.address,
            uid: user.id
          })
        )
        .success(
          function(objectFromFirebase) {
            console.log("success");
            resolve(objectFromFirebase);
          }
        )
        .error(function(){
          console.log("failed");
        })
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