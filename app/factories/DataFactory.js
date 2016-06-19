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


  var postNewClient = function(newClients) {
    let user = AuthFactory.getUser();
    return new Promise((resolve, reject) => {
      $http.post(`${firebaseURL}clients.json`,
          JSON.stringify({
            name: newClients.name,
            email: newClients.email,
            phone: newClients.phone,
            address: newClients.address,
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

  var deleteClient = function(itemId){
    return new Promise((resolve, reject) => {
      $http
              .delete(`${firebaseURL}clients/${itemId}.json`)
              .success(function(objectFromFirebase){
                resolve(objectFromFirebase);
              });
    });
  };

  return {
    getClientList: getClientList,
    postNewClient: postNewClient,
    deleteClient: deleteClient 
  };
});