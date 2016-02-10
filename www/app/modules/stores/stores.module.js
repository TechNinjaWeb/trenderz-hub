var app = angular.module('th.stores', ['ui.router', 'ngResource', 'th.api']);


app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $stateProvider
        .state('stores', {
            abstract: true,
            template: "<div ui-view='body'></div>"
        })
        .state('stores.browse', {
            url: '/stores',
            views: {
                'body@stores': {
                    templateUrl: './views/pages/stores.page.html',
                    controller: 'storesCtrl'
                }
            }
        })
        .state('stores.detail', {
            url: '/stores/:id',
            views: {
                'body@stores': {
                    templateUrl: './views/pages/stores.detail.html',
                    controller: "storeDetailCtrl"
                }
            }
        });
        
        // $locationProvider.html5Mode(true);
        
});
app.controller('storesCtrl', ['$scope', 'Stores', '$stateParams', function( scope, Stores, params ){
    console.log("Params:", params);
    Stores.query(function( stores ){
        scope.stores = stores;
    });
    
}]);

app.controller('storeDetailCtrl', ['$scope', 'Stores', '$stateParams', function( scope, Stores, params ){
    console.log("Get Params ID?", params.id);
    Stores.get( {id: params.id}, function( store ){ 
       scope.store = store; 
    });
    
}]);