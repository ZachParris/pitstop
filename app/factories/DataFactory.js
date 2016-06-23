"use strict";

app.factory("DataFactory", function($http, firebaseURL, AuthFactory) {

    var getClientList = function() {
        let clients = [];
        var user = AuthFactory.getUser();
        return new Promise((resolve, reject) => {
            $http.get(`${firebaseURL}clients.json`)
                .success(function(clientObject) {
                    var clientDataList = clientObject;
                    Object.keys(clientDataList).forEach(function(key) {
                        clientDataList[key].id = key;
                        clients.push(clientDataList[key]);
                    });
                    console.log("clients", clients);
                    resolve(clients);
                });
        });
    };

    var getNewJob = function() {
        let jobs = [];
        var user = AuthFactory.getUser();
        return new Promise((resolve, reject) => {
            $http.get(`${firebaseURL}jobs.json`)
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
                })
        });
    };

    var postNewJob = function(newJob) {
        let user = AuthFactory.getUser();
        return new Promise((resolve, reject) => {
            $http.post(`${firebaseURL}jobs.json`,
                    JSON.stringify({
                        metal: newJob.Metal,
                        stones: newJob.stones,
                        size: newJob.size,
                        value: newJob.value,
                        description: newJob.description,
                        centerStone: newJob.centerStone,
                        prongs: newJob.prongs,
                        shanks: newJob.shanks,
                        other: newJob.other,
                        price: newJob.price,
                        date: newJob.date,
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
                })
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

    var getSingleClient = function(clients) {
        console.log("clients", clients);
        return new Promise((resolve, reject) => {
            $http.get(`${firebaseURL}clients/${clients}.json`)
                .success(function(itemObject) {
                    console.log("itemObject", itemObject);
                    // itemObject.id = ;
                    resolve(itemObject);
                });
        });
    };

    var updateClientInfo = function(id, newItem) {
        // let user = AuthFactory.getUser();
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
        getNewJob: getNewJob,
        postNewJob: postNewJob
    };
});