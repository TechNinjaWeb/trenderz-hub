var app = angular.module('th.api', []);

app.run(function($rootScope, $http, $location){
// Set Default Headers
  var headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': $location.path
       
  }
   
  for (var header in headers) {
      $http.defaults.headers[ header ] = headers[ header ];
  }
});

app.config(['$httpProvider', function ($httpProvider) {
  //Reset headers to avoid OPTIONS request (aka preflight)
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
}]);

app.service('Stores', ['$resource', function($resource) {
    return window.resource = $resource('https://trenderzhub-techninja.c9users.io/Stores/:id', {id: '@id'}, 
    {
        getId: {
            method: 'GET',
            isArray: true,
            id: '@id'
        }
    });
}]);

app.service('Products', ['$resource', function($resource) {
    return window.resource = $resource('https://trenderzhub-techninja.c9users.io/Products/:id', {id: '@id'}, 
    {
        getId: {
            method: 'GET',
            isArray: true,
            id: '@id'
        }
    });
}])

app.service('Categories', ['$resource', function($resource) {
    return window.resource = $resource('https://trenderzhub-techninja.c9users.io/Categories/:name', {name: '@name'}, 
    {
        getId: {
            method: 'GET',
            isArray: true,
            name: '@name'
        }
    });
}]);

app.service('Memberships', ['$resource', function($resource) {
    return window.resource = $resource('https://trenderzhub-techninja.c9users.io/Membership/:id', {name: '@id'}, 
    {
        getId: {
            method: 'GET',
            isArray: true,
            name: '@id'
        }
    });
}]);