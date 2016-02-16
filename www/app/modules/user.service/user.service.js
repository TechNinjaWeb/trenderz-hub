var app = angular.module('th.user.service', ['cache.service', 'ngResource', 'th.login.service']);

app.service('User', ['$rootScope', '$resource', 'DB', 'LoginService', function( rootScope, resource, DB, Auth ){
    var User = { active: false };
    var Session = DB.session.get() || {};
    // Define User
    User.data = DB.session.get('User') || {};
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
    // Clear All Data
    User.clear = function() { return User.data = {}, User; };
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
        return User;
    };
    // Login User
    User.login = function( data ) {
        return Auth.login( {username: data.username, password: data.password} ).then(function( user ){
            if (!user._id) return rootScope.$broadcast('login:error', user), console.log("Failed Login", user);
            // console.log("User Logged In!", user);
            User.update( user ).save();
            // Return The Logged In User
            rootScope.$broadcast('user:loggedIn', user);
            // Return to Caller
            return user;
        });
    };
    // Logout User
    User.logout = function() {
        // Empty The User Object
        return Auth.logout().then(function( user ){
            // Clear the user
            User.clear().save();
            // Return the logged out user object
            rootScope.$broadcast('user:loggedOut', user);
            // Return to Caller
            return user;
        });
    };
    // Key Listeners
    
    // User Created
    rootScope.$on('user:created', function(ev, user){ User.set( user ).save().login( user ) });
    // Update User Data
    rootScope.$on('user:update', function(ev, user){ User.update( user ).save(); });
    // Login Through rootscope
    rootScope.$on('user:login', function(ev, user){ User.login( user ); });
    // Logout through rootscope
    rootScope.$on('user:logout', function(ev){ User.logout(); });
    // Return Service
    return window.UserService = User;
}]);

app.service('Users', ['$resource', function($resource) {
    return window.resource = $resource('https://trenderzhub-techninja.c9users.io/Users', {name: '@id', user: '@user'}, 
    {
        getId: {
            method: 'GET',
            isArray: true,
            name: '@id'
        },
        create: {
            method: 'POST',
            user: '@user',
            transformRequest: function (data) {
                console.log("Transformed", data.user);
                return data;
            }
        }
    });
}]);
