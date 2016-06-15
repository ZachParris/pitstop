"use strict";
app.factory("DataFactory", function($q, $http, firebaseURL, AuthFactory) {
	var getClientList = function() {
    let array = [];
    var user = AuthFactory.getUser();
    return $q(function(resolve, reject) {
      $http.get(`${firebaseURL}clients.json`)
        .success(function(clientsObject) {
          var clientList = clientsObject;
          Object.keys(clientList).forEach(function(client) {
            if (clientList[client].uid === user.uid && clientList[client].Rating < 1) {
              clientList[client].id = client;
              array.push(clientList[client]);
            }
          });
          resolve(array);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };



  var postNewClient = function(newClient) {
    var user = AuthFactory.getUser();
    return $q(function(resolve, reject) {
      $http.post(
          `${firebaseURL}clients.json`,
          JSON.stringify({
            Name: newClient.Name,
            Email: newClient.Email,
            uid: user.uid,
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