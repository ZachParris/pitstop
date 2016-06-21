app.controller("ClientListCtrl", function($scope, $location, DataFactory, AuthFactory){
    $scope.title = "Clients";
    $scope.submitButtonText = "Add New";
    $scope.clients = [];
    $scope.currentClient;

    DataFactory.getClientList().then(function(itemCollection){
        console.log("itemCollection from promise", itemCollection);
        $scope.clients = itemCollection;
    });

    $scope.displayClients = function() {
        if($location.path() === "/client/list"){
            DataFactory.getClientList().then(function(data) {
            $scope.clients = [];
                $scope.clients = data;
                if($scope.clients.length === 0){
                    $rootScope.findListShow = false;
                    $rootScope.addClientShow = true;
                }
            });
        }
        };
            $scope.displayClients();

    $scope.clientDelete = function(clientId){
        DataFactory.deleteClient(clientId).then(function(response){
            DataFactory.getClientList().then(function(itemCollection){
                $scope.clients = itemCollection;
            });
        });
    };



    
    });