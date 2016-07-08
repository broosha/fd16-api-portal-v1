// public/core.js
var scotchTodo = angular.module('scotchTodo', [
    'ngRoute'
]);

scotchTodo.config(function($routeProvider) {
    $routeProvider

    // route for the home page
    .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'mainController'
    })

    // route for the about page
    .when('/api-list', {
        templateUrl : 'pages/api-list.html',
        controller  : 'apiListController'
    });
});

function mainController($scope, $http, $location) {
    $scope.formData = {};

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $location.path('/api-list')
    };
}

function apiListController($scope, $http, $location) {
    $scope.apiList = []
    $scope.consumerList = []
    
     $http.get('/v1/apis', $scope.formData)
        .success(function(data) {
            $scope.apiList = data
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        
        $scope.setConsumerList = function () {
            $http.get('/v1/api-consumers?apiUrl='+$scope.selectedApiId)
                .success(function(data) {
                    $scope.consumerList = data;
                    console.log(data);
                    
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
}