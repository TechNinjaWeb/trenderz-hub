var app = angular.module('th', [
    'ngResource', 
    'ui.router', 
    'th.api', 
    'th.stores',
    'th.products',
    'th.FeaturedProducts',
    ]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $stateProvider
        .state('home', {
            abstract: true,
            views: {
                '@': {
                    template: "<div ui-view='body'></div>"
                },
                'navigation@': {
                    templateUrl: './views/template/home.navigation.html',
                    controller: 'navCtrl'
                },
                'footer@': {
                    templateUrl: './views/template/home.footer.html'
                }
            }
        })
        .state('home.index', {
            url: '/',
            views: {
                'body@home': {
                    templateUrl: './views/pages/home.page.html'
                }
            }
        });
        
        $urlRouterProvider.otherwise('/');
        // $locationProvider.html5Mode(true);
        
});

app.controller('appCtrl', ['$scope', '$state', '$stateParams', function( scope, state, params ){
    scope.message = "This is app ctrl";
    
    scope.test = function(){
        console.log("Working");
    };
    
    scope.goTo = function( statename, data ) {
        // Validate Statechange
        if (!statename) return;
        // Set ID on params object
        if (data && data._id) params.id = data._id;
        if (data && data.id) params.id = data.id;
        if (data && data.name) params.name = data.name.trim().toLowerCase();
        // Set Param Data For Next State
        params.data = data;
        // Transition to state
        state.go(statename, params);
        // Response
        console.log("Moving To State", statename, params);
    };
    
    // console.log("Controller Enabled", scope);
    
    window.appCtrl = scope;
}]);

app.controller('navCtrl', ['$scope', '$state', '$stateParams', 'Categories', function( scope, state, params, Category ){
    scope.links = {};
    
    Category.query(function( categories ){
        categories.forEach(function( cat ){
            console.log("Got Category", cat);
            var alias = cat.name.toLowerCase();
            scope.links[ alias ] = {};
            scope.links[ alias ].id = cat._id;
            scope.links[ alias ].name = alias.toLowerCase();
            scope.links[ alias ].title = cat.name.capitalize();
            scope.links[ alias ].sref = "stores.category";
            scope.links[ alias ].active = false;
        }, this);
        
        console.log("Scope Cat", scope.links);
    });
}]);