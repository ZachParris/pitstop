"use strict";

app.factory("DataFactory", function($http, firebaseURL, AuthFactory) {

    var getClientList = function() {
        let clients = [];
        return new Promise((resolve, reject) => {
            $http.get(`${firebaseURL}clients.json`)
                .success(function(clientObject) {
                    var clientDataList = clientObject;
                    Object.keys(clientDataList).forEach(function(key) {
                        clientDataList[key].id = key;
                        clients.push(clientDataList[key]);
                    });
                    resolve(clients);
                });
        });
    };

    var getWorkOrders = function() {
        let workOrders = [];
        return new Promise((resolve, reject) => {
            $http.get(`${firebaseURL}workOrder.json`)
                .success(function(clientObject) {
                    var clientDataList = clientObject;
                    Object.keys(clientDataList).forEach(function(key) {
                        clientDataList[key].id = key;
                        workOrders.push(clientDataList[key]);
                    });
                    console.log("getWorkOrders", workOrders);
                    resolve(workOrders);
                });
        });
    };

    var getSingleClient = function(clients) {
        console.log("clients", clients);
        return new Promise((resolve, reject) => {
            $http.get(`${firebaseURL}clients.json`)
                .success(function(singleClientObject) {
                 var singleClientData = singleClientObject;
                 console.log(singleClientData);
                 // Object.keys(singleClientData).forEach(function(key) {
                 //        singleClientData[key].id = key;
                 //        clients.push(singleClientData[key]);
                 //    });
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
                .error(function() {
                    console.log("failed");
                });
        });
    };

    var postClientJob = function(workOrder, clientId) {
      console.log("clientId", clientId);
        return new Promise((resolve, reject) => {
            $http.post(`${firebaseURL}workOrder.json`,
                    JSON.stringify({
                        metals: workOrder.metals,
                        stones: workOrder.stones,
                        size: workOrder.size,
                        value: workOrder.value,
                        description: workOrder.description,
                        centerStone: workOrder.centerStone,
                        prongs: workOrder.prongs,
                        shanks: workOrder.shanks,
                        other: workOrder.other,
                        price: workOrder.price,
                        date: workOrder.date,
                        clientId: clientId
                    })
                )
                .success(
                    function(objectFromFirebase) {
                        // console.log("success");
                        resolve(objectFromFirebase);
                    }
                )
                .error(function() {
                    console.log("failed");
                });
        });
    };

    // var getClientWorkOrder = function() {
    //   return new Promise((resolve, reject) => {
    //         $http.get(`${firebaseURL}clients.json?orderBy="uid"&equalTo="${.uid}"`)

    //                 resolve(clients);
    //               });
    //     });
    // };


    var deleteClient = function(clients) {
      console.log("clients", clients);
        return new Promise((resolve, reject) => {
            $http
                .delete(`${firebaseURL}clients/${clients.id}.json`)
                .success(function(objectFromFirebase) {
                  console.log("objectFromFirebase", objectFromFirebase);
                    resolve();
                });
        });
    };

    var updateClientInfo = function(id, newItem) {
        return new Promise((resolve, reject) => {
            $http.put(
              `${firebaseURL}clients/${id}.json`,
            JSON.stringify({
                    name: newItem.name,
                    email: newItem.email,
                    phone: newItem.phone,
                    address: newItem.address,
                    uid: id
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
        postNewClient: postNewClient,
        deleteClient: deleteClient,
        getSingleClient: getSingleClient,
        updateClientInfo: updateClientInfo,
        getWorkOrders: getWorkOrders,
        postClientJob: postClientJob
    };
});