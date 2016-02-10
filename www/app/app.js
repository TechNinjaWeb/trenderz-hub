var app = angular.module('th', [
    'ngResource', 
    'ui.router', 
    'th.api', 
    'th.stores',
    'th.products',
    'th.FeaturedProducts'
    ]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $stateProvider
        .state('home', {
            abstract: true,
            template: "<div ui-view='body'></div>"
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
        if (data && data._id) params.id = data._id;
        params.data = data;
        
        state.go(statename, params);
        
        console.log("Moving To State", statename, params);
    };
    console.log("Controller Enabled", scope);
    
    window.appCtrl = scope;
}]);