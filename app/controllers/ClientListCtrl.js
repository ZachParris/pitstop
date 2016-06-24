app.controller("ClientListCtrl", function($scope, $location, $routeParams, DataFactory, AuthFactory){
    $scope.title = "Registered Clients";
    $scope.submitButtonText = "Add New";
    $scope.clients = [];
    $scope.currentClient;

    DataFactory.getClientList().then(function(itemCollection){
        console.log("itemCollection from promise", itemCollection);
        $scope.clients = itemCollection;
    });

    $scope.clientSelect = function(){
    DataFactory.getSingleClient($routeParams.id)
        .then(function successCallback(response){
            console.log("response", response);
            $scope.clients=response;
            $scope.currentClient = $scope.clients.filter(function(client){
            return client.id === $routeParams.id;
        })[0];
        });
        DataFactory.getSingleClient($routeParams.id);
        
    };

  
    $scope.clientDelete = function(currentClient){
        console.log("currentClient", currentClient);
        DataFactory.deleteClient(currentClient).then(function(response){
            DataFactory.getClientList().then(function(data) {
                $scope.clients = data;
                $scope.$apply();
                }
            );
        });
    };

    $scope.inputChange = function(item){
        DataFactory.updateClientInfo(item)
            .then(function(response){
                console.log(response);
            });
    };

    $scope.displayClients = function() {
        if($location.path() === "/client/list"){
            DataFactory.getClientList().then(function(data) {
            $scope.clients = [];
                $scope.clients = data;
                if($scope.clients.length === 0){
                    $rootScope.clientListShow = false;
                    $rootScope.clientAddShow = true;
                }
            });
        }
        };
            $scope.displayClients();




    
    });