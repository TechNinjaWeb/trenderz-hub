var app = angular.module('th.login.service', []);

app.service('LoginService', ['$rootScope', 'LoginResource', function( rootScope, resource ){
    var Login = {};
    
    
    Login.login = function( data ) {
        var user = resource.get( data ).$promise;
        return new Promise(function(res, rej){
            // Resolve or Reject The User
            user.then(function( u ){ return u.error || u.err || u.message 
                ? rootScope.$broadcast( 'login:error', u )
                : rootScope.$broadcast( 'login:success', u );
            });
            // Return Resolved User Data to Caller;
            user.then(function( u ){ return u.error || u.err || u.message ? rej( u ) : res( u); });
        });
    };
    
    rootScope.$on('user:loggedIn', function(){ return "TBA" });
    
    return Login;
}])

app.service('LoginResource', ['$resource', function($resource) {
    return window.resource = $resource('https://trenderzhub-techninja.c9users.io/login', {}, 
    {
        getId: {
            method: 'GET',
            isArray: true,
            name: '@id'
        }
    });
}]);