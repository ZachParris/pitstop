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
                    resolve(clients);
                  });
        });
    };

    var getSingleJob = function(clientId) {
      let selectedJob = [];
        return new Promise((resolve, reject) => {
            $http.get(`${firebaseURL}workOrder/${clientId}.json`)
                .success(function(orderObject) {
                  console.log("orderObject", orderObject);
                 var jobCollection = orderObject;
                 Object.keys(jobCollection).forEach(function(key){
                   if(jobCollection[key].clientId === clientId) {
                     jobCollection[key].id = key;
                     selectedJob.push(jobCollection[key]);
                   }
                 });
                 console.log(jobCollection);
                    resolve(clientId);
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
                        centerStones: workOrder.centerStones,
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
                        console.log("success");
                        resolve(objectFromFirebase);
                    }
                )
                .error(function() {
                    console.log("failed");
                });
        });
    };

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

      var deleteJob = function(id) {
      console.log("workOrder", id);
        return new Promise((resolve, reject) => {
            $http
                .delete(`${firebaseURL}workOrder/${id}.json`)
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

    var updateJobData = function(id, newWorkOrder, clientId) {
        return new Promise((resolve, reject) => {
            $http.put(
              `${firebaseURL}workOrder/${id}.json`,
            JSON.stringify({
                        metals: newWorkOrder.metals,
                        stones: newWorkOrder.stones,
                        size: newWorkOrder.size,
                        value: newWorkOrder.value,
                        description: newWorkOrder.description,
                        centerStones: newWorkOrder.centerStones,
                        prongs: newWorkOrder.prongs,
                        shanks: newWorkOrder.shanks,
                        other: newWorkOrder.other,
                        price: newWorkOrder.price,
                        date: newWorkOrder.date,
                        clientId: clientId
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
        deleteJob: deleteJob,
        getSingleClient: getSingleClient,
        getSingleJob: getSingleJob,
        updateClientInfo: updateClientInfo,
        updateJobData: updateJobData,
        getWorkOrders: getWorkOrders,
        postClientJob: postClientJob
    };
});
