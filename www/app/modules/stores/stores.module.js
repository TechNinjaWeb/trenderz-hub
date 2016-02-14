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
        .state('stores.browse', {
            url: '/stores',
            views: {
                'body@stores': {
                    templateUrl: './app/modules/stores/views/pages/stores.page.html',
                    controller: 'storesCtrl',
                    resolve: {
                        Stores: 'Stores',
                        stores: function( Stores ) {
                            return Stores.query().$promise;
                        }
                    }
                }
            }
        })
        .state('stores.detail', {
            url: '/stores/:id',
            views: {
                'body@stores': {
                    templateUrl: './app/modules/stores/views/pages/stores.detail.html',
                    controller: "storeDetailCtrl",
                    resolve: {
                        Stores: 'Stores',
                        store: function( Stores, $stateParams ){
                            return Stores.get( {id: $stateParams.id}).$promise;
                        }
                    }
                }
            }
        })
        .state('stores.category', {
            url: '/cateogry/:name',
            views: {
                'body@stores': {
                    templateUrl: './app/modules/stores/views/pages/stores.category.html',
                    controller: "storeCategoryCtrl",
                    resolve: {
                        Categories: 'Categories',
                        category: function( Categories, $stateParams ) {
                            return  Categories.get( {name: $stateParams.name}).$promise;
                        }
                    }
                }
            }
        });;
});
app.controller('storesCtrl', ['$scope', 'stores', '$stateParams', function( scope, stores, params ){
    console.log("Params:", params, scope);

    scope.stores = stores
    
}]);

app.controller('storeDetailCtrl', ['$scope', 'store', '$stateParams', function( scope, store, params ){
    // console.log("Get Params ID?", params.id);

    scope.store = store;
    
}]);

app.controller('storeCategoryCtrl', ['$scope', 'category', '$stateParams', function( scope, category, params ){
    // console.warn("Got Categories Resolve", category);
  
    scope.category = category;
    
}]);