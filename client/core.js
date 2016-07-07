// public/core.js
var scotchTodo = angular.module('scotchTodo', []).config(function ($routeProvider) {
  $routeProvider.when("/home", {
    templateUrl: "home.html",
  }).otherwise({
    redirectTo: "/"
  });
});

function mainController($scope, $http, $location) {
    $scope.formData = {};


    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
                    

        $http.post('/v1/applications', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
            
            $location.path('/home');
    };
}



function affirmation($scope, $http) {
    
    
    


}