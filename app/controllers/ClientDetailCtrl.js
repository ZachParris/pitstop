app.controller("ClientDetailCtrl", function($scope, $location, $routeParams, $rootScope, DataFactory, AuthFactory) {
	$scope.title = "Welcome Back!";
    $scope.submitButtonText = "Add New Job";
    $scope.selectedClient = [];

    //  DataFactory.getClientList().then(function(itemCollection){
    //     console.log("itemCollection from promise", itemCollection);
    //     $scope.selectedClient = itemCollection;
    // });


    var displaySelectedClient = function() {
      if($location.path() === "/client/:id"){
        DataFactory.getSingleClient($routeParams.id).then(function(data) {
          console.log("data", data);
          $scope.selectedClient = data;
        });
      }
    };
    displaySelectedClient();


});
 





  //   $scope.postClientUpdate = function(clientUpdate, selectedClient) {
  //   let user = AuthFactory.getUser();
  //   return new Promise((resolve, reject) => {
  //     $http.put(`${firebaseURL}clients${selectedClient.id}.json`,
  //         JSON.stringify({
  //           name: clientUpdate.name,
  //           email: clientUpdate.email,
  //           phone: clientUpdate.phone,
  //           address: clientUpdate.address,
  //           uid: user.id
  //         })
  //       )
  //       .success(
  //         function(objectFromFirebase) {
  //           console.log("success");
  //           resolve(objectFromFirebase);
  //         }
  //       )
  //       .error(function(){
  //         console.log("failed");
  //       })
  //   });
  // };