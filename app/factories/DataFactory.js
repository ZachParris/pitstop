"use strict";
app.factory("DataFactory", function($http, firebaseURL, AuthFactory) {

	var getClientList = function() {
    let clients = [];
    var user = AuthFactory.getUser();
   return new Promise((resolve, reject) => {
      $http.get(`${firebaseURL}clients.json`)
        .success(function(clientObject) {
			var clientDataList = clientObject;
			Object.keys(clientDataList).forEach(function(key){
				clientDataList[key].id=key;
				clients.push(clientDataList[key]);
					});
          resolve(clients);
          });
        });
  };


  var postNewClient = function(newClient) {
    return new Promise((resolve, reject) => {
      $http.post(
          `${firebaseURL}clients.json`,
          JSON.stringify({
            name: newClient.name,
            email: newClient.email,
            phone: newClient.phone,
            id: null,
            address: newClient.address
          })
        )
        .success(
          function(objectFromFirebase) {
            resolve(objectFromFirebase);
          }
        );
    });
  };
  return {
    getClientList: getClientList,
    postNewClient: postNewClient 
  };
});