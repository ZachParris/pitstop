app.controller("ClientListCtrl", function($scope, $location, $rootScope, DataFactory, AuthFactory){
    $scope.clients = [];

    DataFactory.getClientList().then(function(itemCollection){
        console.log("itemCollection from promise", itemCollection);
        $scope.clients = itemCollection;
        console.log("clients", $scope.clients);
    });

    $scope.displayClients = function() {
        if($location.path() === "/client-list"){
            DataFactory.getClientList().then(function(data) {
            $scope.clients = [];
                $scope.clients = data;
                if($scope.clients.length === 0){
                    $rootScope.findListShow = false;
                    $rootScope.addClientShow = true;
                }
                console.log("client?", $scope.clients);
            });
        }
        };
        $scope.displayClients();

    
    });