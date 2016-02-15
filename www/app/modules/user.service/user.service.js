var app = angular.module('th.user.service', ['cache.service', 'ngResource', 'th.login.service']);

app.service('User', ['$rootScope', '$resource', 'DB', 'LoginService', function( rootScope, resource, DB, Auth ){
    var User = { active: false };
    var Session = DB.session.get() || {};
    // Define User
    User.data = DB.get('user') || {};
    if (User.data.hasOwnProperty('username')) User.active = true;
    else User.active = false;
    // Set User Data
    User.get = function() { return User.data };
    // Destructive Set
    User.set = function( data ) { User.data = data; User.active = true; return User; };
    // Non destructive Update
    User.update = function( data ) {
        for (var prop in data) { 
            // The val we're interested in
            var val = data[ prop ];
            // Verfify prop should be added
            var isFunc = typeof val === 'function' ? true : false;
            // Add if not a function
            !isFunc || val !== null || val !== undefined ? User.data[ prop ] = val : null;
            // Debugging
            // console.log("Is Fun?", isFunc, "val null?", val === null || val === undefined);
        }
        
        return User;
    };
    User.updateProp = function( prop, val ) { User.data[ prop ] = val; return User; };
    // User Is Active
    User.isActive = function() { return User.data.active };
    // User Is Logged In
    User.isAuthed = function() { return User.data.loggedIn || false };
    // Save To Session Storage 
    User.save = function() {
        // Save To Session Store
        var user = User.get();
        var saved = DB.session.save('User', user);
        rootScope.$broadcast('user:updated', saved);
        // console.info("Updated User", saved);
    };
    // Login User
    User.login = function( data ) {
        // console.dir(UserAPI);
        // var user = UserAPI.get( data ).$promise;
        // return new Promise(function(res, rej){
        //     // Resolve or Reject The User
        //     user.then(function( u ){ return u.error || u.err || u.message ? rej( u ) : res( u); });
        // });
        Auth.login( data ).then(function( user ){
            console.log("User Logged In!", user); 
        });
    };
    // Key Listeners
    rootScope.$on('user:update', function(ev, user){ // Update User Data
        User.update( user ).save();
    });
    
    rootScope.$on('user:loggedIn', function(ev, user){ // Update User Data
        // Debugging
        // console.log("logged", user);
        User.update( user ).save();
    });
    
    rootScope.$on('user:loggedOut', function(ev, user){ // Update User Data
        User.update( user ).save();
    });
    // Login Through rootscope
    rootScope.$on('user:login', function(ev, user){ User.login(); });
    // Logout through rootscope
    rootScope.$on('user:logout', function(ev){ User.logout(); });
    // Return Service
    return window.UserService = User;
}]);

app.service('Users', ['$resource', function($resource) {
    return window.resource = $resource('https://trenderzhub-techninja.c9users.io/Users/:id', {name: '@id'}, 
    {
        getId: {
            method: 'GET',
            isArray: true,
            name: '@id'
        }
    });
}]);
