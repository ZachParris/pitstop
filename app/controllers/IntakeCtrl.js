"use strict";

app.controller("IntakeCtrl", function($scope, $location, $routeParams, $window, $rootScope, DataFactory) {
	$scope.title = "Intake";
    $scope.promiseDate;
    $scope.submitButtonText = "Submit";
    $scope.newClientWorkOrder = [];
    $scope.workOrder = {
    		metals: "",
        stones: "",
        size: "",
        value: "",
        description: "",
        centerStones: "",
        prongs: "",
        shanks:"",
        other: "",
        price: "",
        date: ""
    };
    $scope.workOrders = [];


    $scope.addWorkOrder = function(){
        $scope.workOrder.date = $scope.promiseDate;
        DataFactory.postClientJob($scope.workOrder, $routeParams.id)
            .then((response) => {
                console.log("response", response);
                $scope.$apply($scope.newClientWorkOrder);
                $location.url(`/client/${$routeParams.id}`);
                $scope.$apply();
            });
        console.log($scope.newPromiseDate );
        console.log($scope.promiseDate);
    };

    var promiseDate = new Date();

        $scope.promiseDate = promiseDate;
        $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        $scope.disable = [false, 1, 7];
        $scope.today = 'Today';
        $scope.clear = 'Clear';
        $scope.close = 'Close';
        $scope.onStart = function () {
            console.log('onStart');
        };
        $scope.onRender = function () {
            console.log('onRender');
        };
        $scope.onOpen = function () {
            console.log('onOpen');
        };
        $scope.onClose = function () {
            console.log('onClose');
        };
        $scope.onSet = function () {
            console.log('onSet');
        };
        $scope.onStop = function () {
            console.log('onStop');
        };


});
