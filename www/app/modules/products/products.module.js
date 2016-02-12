var app = angular.module('th.products', ['ui.router', 'ngResource', 'th.api']);


app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $stateProvider
        .state('products', {
            views: {
                '@': {
                    template: "<div ui-view='body'></div>"
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
        .state('products.browse', {
            url: '/products',
            views: {
                'body@products': {
                    templateUrl: './views/pages/products.page.html',
                    controller: 'productsCtrl'
                }
            }
        })
        .state('products.detail', {
            url: '/products/:id',
            views: {
                'body@products': {
                    templateUrl: './views/pages/products.detail.html',
                    controller: "productDetailCtrl"
                }
            }
        });
});
app.controller('productsCtrl', ['$scope', 'Products', '$stateParams', function( scope, Products, params ){
    console.log("Params:", params);
    Products.query(function( products ){
        scope.products = products;
    });
    
}]);

app.controller('productDetailCtrl', ['$scope', 'Products', '$stateParams', function( scope, Products, params ){
    console.log("Get Params ID?", params.id);
    Products.get( {id: params.id}, function( product ){ 
       scope.product = product; 
    });
    
}]);