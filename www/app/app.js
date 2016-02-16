var app = angular.module('th', [
    'ngResource',
    'ngAnimate',
    'ui.router',
    'th.api',
    'th.user.service',
    'th.stores',
    'th.products',
    'th.FeaturedProducts',
    'th.admin',
    'th.account',
    'th.shopping.cart'
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('home', {
            abstract: true,
            views: {
                '@': {
                    template: "<div ui-view='body' class='animation'></div>"
                },
                'navigation@': {
                    templateUrl: './app/views/template/home.navigation.html',
                    controller: 'navCtrl'
                },
                'footer@': {
                    templateUrl: './app/views/template/home.footer.html',
                    controller: 'footerCtrl'
                }
            }
        })
        .state('home.index', {
            url: '/',
            views: {
                'body@home': {
                    templateUrl: './app/views/pages/home.page.html'
                }
            }
        })
        .state('pages', {
            abstract: true,
            views: {
                '@': {
                    template: "<div ui-view='body' class='animation'></div>"
                },
                'navigation@': {
                    templateUrl: './app/views/template/home.navigation.html',
                    controller: 'navCtrl'
                },
                'footer@': {
                    templateUrl: './app/views/template/home.footer.html',
                    controller: 'footerCtrl'
                }
            }
        })
        .state('pages.info', {
            url: '/info',
            views: {
                'body@pages': {
                    templateUrl: './app/views/pages/info.page.html'
                }
            }
        })
        .state('pages.signup', {
            url: '/signup',
            views: {
                'body@pages': {
                    templateUrl: './app/views/pages/signup.page.html',
                    controller: 'signupCtrl'
                }
            }
        })
        .state('pages.membership', {
            url: '/membership',
            views: {
                'body@pages': {
                    templateUrl: './app/views/pages/membership.page.html',
                    controller: 'membershipCtrl'
                }
            }
        })
        .state('pages.contact', {
            url: '/contact',
            views: {
                'body@pages': {
                    templateUrl: './app/views/pages/contact.page.html'
                }
            }
        })
        .state('policies', {
            url: '/policies',
            abstract: true,
            views: {
                '@': {
                    template: "<div ui-view='body' class='animation'></div>"
                },
                'navigation@': {
                    templateUrl: './app/views/template/home.navigation.html',
                    controller: 'footerCtrl'
                },
                'footer@': {
                    templateUrl: './app/views/template/home.footer.html',
                    controller: 'footerCtrl'
                }
            }
        })
        .state('policies.mall', {
            url: '/mall',
            views: {
                'body@policies': {
                    templateUrl: './app/views/pages/mall.policy.html'
                }
            }
        })
        .state('policies.privacy', {
            url: '/privacy',
            views: {
                'body@policies': {
                    templateUrl: './app/views/pages/privacy.policy.html'
                }
            }
        })
        .state('test', {
            abstract: true,
            views: {
                '@': {
                    template: "<div ui-view='body' class='animation'></div>"
                },
                'navigation@': {
                    templateUrl: './app/views/template/home.navigation.html',
                    controller: 'footerCtrl'
                },
                'footer@': {
                    templateUrl: './app/views/template/home.footer.html',
                    controller: 'footerCtrl'
                }
            }
        })
        .state('test.index', {
            url: '/test',
            views: {
                'body@test': {
                    templateUrl: './app/views/pages/test.html'
                }
            }
        });;

    $urlRouterProvider.otherwise('/');
    // $locationProvider.html5Mode(true);

});

app.run(['$rootScope', '$state', '$stateParams', '$location', '$anchorScroll', '$timeout', 'User', function($rootScope, state, params, $location, $anchorScroll, $timeout, User) {
    // Default Store Info
    $rootScope.trenderzhub = {};
    $rootScope.trenderzhub.name = "Trenderz Hub";
    $rootScope.trenderzhub.email = "trenderzhub@gmail.com";
    $rootScope.trenderzhub.address = "123 Fake Street Edmonton Ab, T5S 6S6";
    
    $rootScope.user = User.get() || {};
    $rootScope.loggedIn = true;
    // Set User Upon Login
    // $rootScope.$on('user:loggedIn', function(ev, user){ $rootScope.$apply(function(){ $rootScope.user = user; }); state.go('account.page'); });
    // $rootScope.$on('user:loggedOut', function(ev, user){ $rootScope.$apply(function(){ $rootScope.user = {}; }); state.go('home.index'); });
    
    $rootScope.$on('user:loggedIn', function(ev, user){ $rootScope.user = user;state.go('account.page'); });
    $rootScope.$on('user:loggedOut', function(ev, user){  $rootScope.user = {}; state.go('home.index'); });
    // Login and Out
    $rootScope.login = User.login;
    $rootScope.logout = User.logout;
    
    // Configure Loading Screen
    $rootScope.config = {};
    $rootScope.config.app_url = $location.url();
    $rootScope.config.app_path = $location.path();
    $rootScope.layout = {};
    $rootScope.layout.loading = false;
    
    $rootScope.$on('$stateChangeStart', function() {
        console.log('$stateChangeStart');
        //show loading gif
        $timeout(function() {
            $rootScope.layout.loading = true;
        });
    });
    $rootScope.$on('$stateChangeSuccess', function() {
        console.log('$stateChangeSuccess');
        //hide loading gif
        $timeout(function() {
            $rootScope.layout.loading = false;
        }, 200);
    });
    $rootScope.$on('$stateChangeError', function() {
    
        //hide loading gif
        alert('wtff');
        $rootScope.layout.loading = false;
    
    });

    // Primary Functions    
    $rootScope.goTo = function(statename, data, params) {
        console.log("Called In Main App", arguments);
        if (!statename) return;
        // Set ID on params object
        if (data && data._id) params.id = data._id;
        if (data && data.id) params.id = data.id;
        if (data && data.name) params.name = data.name.trim().toLowerCase();

        // Transition to state
        state.go(statename, params);
        // Response
        console.log("Moving To State", statename, params);
    };
    
    // Auto Scroll To Top or Param Position
    $anchorScroll.yOffset = 100;
    $rootScope.$on('$stateChangeSuccess', function(newRoute, oldRoute) {
        $location.hash(params.scrollTo);
        $anchorScroll("topAnchor");
    });
    // Window Factory
    window.anchorScroll = $anchorScroll;
    // Authentication Check
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
        var needAuth = toState.name.search('account') >= 0 ? true : false;
        var needAdmin = toState.name.search('admin') >= 0 ? true : false;
        // Debugging
        // console.log("Going To " + toState.name, ['needsAuth', needAuth, 'needAdmin', needAdmin]);
        // Needs Auth and Admin
        if (needAdmin)
            return !!$rootScope.user.username && $rootScope.user.roles.indexOf('Member') >= 0 || !!$rootScope.user.username && $rootScope.user.roles.indexOf('Admin') >= 0 
                ? null
                : reroute();
        // Needs Auth Only
        if (needAuth)
            return !!$rootScope.user.username && $rootScope.user.roles.indexOf('Registered') >= 0 
                ? null
                : reroute();
        
        function reroute(){
            // console.log("Rerouting You Dummy!", $rootScope.user.roles);
            event.preventDefault();
            state.go('home.index');
        }
    });
}]);

app.controller('appCtrl', ['$scope', '$state', '$stateParams', 'User', function(scope, state, params, User) {
    scope.User = User.get() || {};
    
    scope.test = function(data) {
        console.log("Testing", arguments);
    };

    scope.goTo = function(statename, data) {
        // Validate Statechange
        if (!statename) return;
        // Set ID on params object
        if (data && data._id) params.id = data._id;
        if (data && data.id) params.id = data.id;
        if (data && data.name) params.name = data.name.trim().toLowerCase();
        // Set Param Data For Next State
        if (data) params.data = data;
        // Invoke Rootscope Navigation
        // rootScope.goTo( statename, null, params);
        // Transition to state
        console.warn("Navigating To " + statename, ["data", data], ["params", params]);
        state.go(statename, params);
    }
}]);

app.controller('navCtrl', ['$scope', '$state', '$stateParams', 'Categories', function(scope, state, params, Category) {
    // Links Object
    scope.links = {};
    // Get Categories
    Category.query(function(categories) {
        categories.forEach(function(cat) {
            var alias = cat.name.toLowerCase();
            scope.links[alias] = {};
            scope.links[alias].id = cat._id;
            scope.links[alias].name = alias.toLowerCase();
            scope.links[alias].title = cat.name.capitalize();
            scope.links[alias].sref = "stores.category";
            scope.links[alias].active = false;
        }, this);
    });
}]);

app.controller('footerCtrl', ['$scope', '$state', '$stateParams', function(scope, state, params) {
    scope.links = {
        about: {
            title: "Company Info",
            sref: 'pages.info'
        },
        contact: {
            title: "Contact Us",
            sref: 'pages.contact'
        },
        orders: {
            title: "Orders Page",
            sref: 'account.orders'
        },
        mallPolicy: {
            title: "Mall Policy",
            sref: 'policies.mall'
        },
        privacyPolicy: {
            title: "Privacy Policy",
            sref: 'policies.privacy'
        },
        signup: {
            title: 'Sign Up',
            sref: 'pages.signup'
        }
    };
}]);

app.controller('membershipCtrl', ['$scope', 'Memberships', function(scope, Levels) {
    Levels.query(function(levels) {
        scope.levels = levels;
    });
}]);

app.controller('signupCtrl', ['$scope', 'Users', '$rootScope', function(scope, Users, rootScope) {
    scope.user = {};
    
    scope.login = function( user )  {
        console.log("Login User", user);
        scope.$emit('user:login', user);
    };
    
    scope.createUser = function(data) {
        if (data.password !== data.confirm || !data.password) return console.warning("Passwords Do Not Match");
        var User = new Users({ user: data });
        console.log("Created New User to save", User);
        
        User.$create(function( user ){
            if (user.error) {
                // if (user.error.errmsg.search('duplicate')) return console.warning("Username Already Exists"), console.warn("Dup User", user.error);
                // else return console.warn( user.error.errmsg ), console.warn("Cannot Determine Error", user.error);
                return console.log("Not Valid", user);
            }
            
            console.log("Saved User", user);
            rootScope.$broadcast('user:created', user);
        });
    };
}]);

app.directive('pwCheck', ['Users', function(Users) {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            var password = scope.user.password;
            console.log("Password", password)
            elem.add(password).on('keyup', function() {
                scope.$apply(function() {
                    var v = elem.val() === $(password).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    }
}]);

app.directive('loader', ['$compile', function( $compile ){
    return {
      restrict: 'EA',
      replace: true,
      link: function( scope, elem, attrs ) {
          var img = '<img src="http://lp.optionweb.com/it/landing1/images/Loading.gif"'+
          'ng-hide="!layout.loading" width="100"  />';
          // Define Loader Template
          var loader = $compile( img )( scope );
          // Add To Body
          elem.append( loader );
          console.log("Appended Loader", loader);
      }
    };
}]);

app.directive('smallNav', ['$compile', function( $compile ){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './app/views/template/small.navigation.html',
      link: function( scope, elem, attrs ) {
          var parent = elem;
          var button = elem.find('.dropdown-button');
          
          // Enable Dropdown
          button.dropdown();
          console.log("Small Nav Loaded", elem, button);
      }
    };
}]);

