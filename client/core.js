
var apiPortal = angular.module('apiPortal', [
    'ngRoute'
]);

apiPortal.config(function($routeProvider) {
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
    })
     .when('/api-consumer', {
        templateUrl : 'pages/api-consumer.html',
        controller  : 'apiConsumerController'
    })
    .when('/api-consumer-details', {
        templateUrl : 'pages/api-consumer-details.html',
        controller  : 'apiConsumerDetailsController'
    });
});




function mainController($scope, $http, $location) {
    $scope.login = function() {

        $location.path('/api-list')
    };
}


apiPortal.service('apiConsumer', function() {
  var apiConsumer;

  var addApiConsumer = function(newObj) {
      apiConsumer = newObj;
  };

  var getApiConsumer = function(){
      return apiConsumer;
  };

  return {
    addApiConsumer: addApiConsumer,
    getApiConsumer: getApiConsumer
  };

});



function apiListController($scope, $http, $location, apiConsumer) {
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
        
        $scope.editApiConsumer = function(data) {
                console.log('Edit Api Consumer :'+data);
                
                            apiConsumer.addApiConsumer(data);

                
                $location.path('/api-consumer');
            
        }
        
    //$location.path('/home');
};



function apiConsumerController($scope, $http, $location, apiConsumer) {
  
  console.log('Der Consumer wurde erfolgreich übertragen: '+apiConsumer);
  console.log(apiConsumer.getApiConsumer())
  
  $scope.rateLimit = apiConsumer.getApiConsumer()['rate-limit']
  
  
  
}


function apiConsumerDetailsController($scope, $http, $location, apiConsumer) {
  
  console.log('Der Consumer wurde erfolgreich übertragen: '+apiConsumer);
  console.log(apiConsumer.getApiConsumer())
  
  /*$scope.rateLimit = apiConsumer.getApiConsumer()['rate-limit'];*/
  
  $scope.gotoApiList = function() {

        $location.path('/api-list')
    };
  
}