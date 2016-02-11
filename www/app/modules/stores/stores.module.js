var app = angular.module('th.stores', [
    'ui.router', 
    'ngResource',
    'th.slideDeck',
    'th.api'
]);


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
                },
                'navigation@': {
                    templateUrl: './views/template/home.navigation.html',
                    controller: 'navCtrl'
                },
                'footer@': {
                    templateUrl: './views/template/home.footer.html',
                    controller: 'footerCtrl'
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
        })
        .state('stores.category', {
            url: '/cateogry/:name',
            resolve: {
                id: function($stateParams) {
                    console.log("StateParams ID", $stateParams);
                    return $stateParams.id;
                }
            },
            views: {
                'body@stores': {
                    templateUrl: './views/pages/stores.category.html',
                    controller: "storeCategoryController"
                }
            }
        });;
        
        // $locationProvider.html5Mode(true);
        
});
app.controller('storesCtrl', ['$scope', 'Stores', '$stateParams', function( scope, Stores, params ){
    console.log("Params:", params, scope);
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

app.controller('storeCategoryController', ['$scope', 'Categories', '$stateParams', function( scope, Category, params ){
    console.warn("Category ID?", params.name, [params]);
    Category.get( {name: params.name}, function( category ){ 
       scope.category = category; 
    });
    
}]);