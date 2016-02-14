var app = angular.module('th.products', ['ui.router', 'ngResource', 'th.api']);


app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $stateProvider
        .state('products', {
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
        .state('products.browse', {
            url: '/products',
            views: {
                'body@products': {
                    templateUrl: './app/modules/products/views/pages/products.page.html',
                    controller: 'productsCtrl',
                    resolve: {
                        Products: 'Products',
                        products: function( Products ) {
                            return Products.query().$promise;
                        }
                    }
                }
            }
        })
        .state('products.detail', {
            url: '/products/:id',
            views: {
                'body@products': {
                    templateUrl: './app/modules/products/views/pages/products.detail.html',
                    controller: "productDetailCtrl",
                    resolve: {
                        Products: 'Products',
                        product: function(Products, $stateParams) {
                            return Products.get( {id: $stateParams.id}).$promise;
                        }
                    }
                }
            }
        });
});
app.controller('productsCtrl', ['$scope', 'products', '$stateParams', function( scope, products, params ){
    console.log("Params:", params);
    // Products.query(function( products ){
    //     scope.products = products;
    // });
    
    scope.products = products;
    
}]);

app.controller('productDetailCtrl', ['$scope', 'product', '$stateParams', function( scope, product, params ){
    console.log("Get Params ID?", params.id);
    scope.product = product;
    
    
}]);