var app = angular.module('th.FeaturedProducts', ['ngResource', 'th.api']);

app.controller('featuredCtrl', ['$scope', 'Products', function(scope, Products){
       scope.message = "Featured Product Ctrl";
       
       console.log(scope.message);
       
       Products.query(function( products ){
            scope.products = products; 
       });
}]);

app.directive('featuredProducts', function(Products){
   return {
        restrict: 'E',
        replace: true,
        // require: ['@featuredProducts'],
        templateUrl: './app/modules/featured.products/featured.products.html',
        controller: 'featuredCtrl',
        link: function( scope, elem, attrs, ctrls) {
           console.log("Linked", arguments);
        }
   } 
});

app.filter('ellipses', function(){
   return function( string, limit ) {
       if (!string || !limit) return string;
       console.log("Substring Limit" + limit, string.substr(0, limit));
        if (string.length <= limit) return string;
        else return string.substr(0, limit) + " ...";
   };
});

app.filter('decodeText', function(){
   return function( string ) {
        if (!string) return string;
    
        // Convert Spaces
        do { string = string.replace('%20', ' ') } while (string.search('%20') >= 0 );
        // Convert Apostrophes
        do { string = string.replace('%27', "'") } while (string.search('%27') >= 0 );
        return string;
   };
});