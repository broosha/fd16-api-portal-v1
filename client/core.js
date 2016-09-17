
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
        
        $scope.newApiConsumer = function() {
                console.log('New Api Consumer');
                
                $location.path('/api-consumer');
        }
        
        $scope.deleteApiConsumer = function(selectedConsumer, index) {
                console.log('Delete Api Consumer :'+selectedConsumer);
                
                $http.delete('/v1/api-consumers/'+selectedConsumer._id)
                .success(function(data) {
                    $scope.consumerList.splice(index, 1);
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
        
    //$location.path('/home');
};



function apiConsumerController($scope, $http, $location, apiConsumer) {
  
    console.log('Der Consumer wurde erfolgreich übertragen: '+apiConsumer);
    console.log(apiConsumer.getApiConsumer())
  
    $scope.rateLimit = apiConsumer.getApiConsumer()['rate-limit']
    $scope.appId = apiConsumer.getApiConsumer()['application']
    $scope.authProvider = apiConsumer.getApiConsumer()['authProvider']['auth-provider-type']
  
    $scope.oAuthScopeList = apiConsumer.getApiConsumer()['authProvider']['oauth-scope']
  
    $scope.endPointUrlValue = apiConsumer.getApiConsumer()['endpoint-url']
  
  
    $scope.saveApiConsumer = function() {
        console.log('Save Api Consumer');
        $location.path('/api-list');
    }
        
  
  
    $scope.saveConsumer = function() {
      
      
    var consumerItem = [
        {
        _id: apiConsumer.getApiConsumer()['_id'],
        api: apiConsumer.getApiConsumer()['api'],
        application: $scope.application,
        authProvider: 
                {
                    'auth-provider-type': $scope.authProvider,
                    'client-id': apiConsumer.getApiConsumer()['authProvider']['client-id'],
                    'client-secret': apiConsumer.getApiConsumer()['authProvider']['client-secret'],
                    'oauth-scope': $scope.oAuthScopeList
                             
                        
                        
                },
        
         'endpoint-url': $scope.endPointUrlValue,
         'rate-limit': $scope.rateLimit
            
        }
        
        ];
    
      
      
  apiConsumer.addApiConsumer(consumerItem);
      
  }
  
  
  
  
  
}


function apiConsumerDetailsController($scope, $http, $location, apiConsumer) {
  
  console.log('Der Consumer wurde erfolgreich übertragen: '+apiConsumer);
  console.log(apiConsumer.getApiConsumer())
  
  /*$scope.rateLimit = apiConsumer.getApiConsumer()['rate-limit'];*/
  
  $scope.gotoApiList = function() {

        $location.path('/api-list')
    };
  
}