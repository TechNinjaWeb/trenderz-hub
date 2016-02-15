var app = angular.module('th.shopping.cart', ['cache.service']) 

app.filter('getQty', function(){
    return function(item, items) {
        return items.filter(function(i){
            if (i._id === item._id) return i;
        }, items).length;
    }
});

app.filter('groupProducts', function(){
    return function( products ) {
        // console.log("Products in", products);
        var res = products.reduce(function( o, product, i, a ){
            o[ product.name ] = o[ product.name ] || product || {};
            var item = o[ product.name ];
            for (var prop in product) {
                item[ prop ] = product[ prop ];
            }
            item.price = product.price;
            // console.warn("Product", product);
            return o;
        }, {});
        // console.warn("Grouped", res);
        // Return Response
        return res;
    };
});

app.run(function($rootScope){
    $rootScope.addProduct = function(item) {
        $rootScope.$broadcast('cart:add', item);
    };
    
    $rootScope.removeProduct = function(idx, item) {
        if (!item) $rootScope.$broadcast('cart:remove', idx);
        if (!idx) $rootScope.$broadcast('cart:remove:id', item._id);
    };
    
    $rootScope.clearCart = function() {
        $rootScope.$broadcast('cart:empty', true);
    };
});

app.config(function($stateProvider){
    $stateProvider
        .state('shopping', {
            abstract: true,
            views: {
                '@': {
                    template: "<div ui-view='body'></div>"   
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
        .state('shopping.cart', {
            url: '/cart',
            views: {
                'body@shopping': {
                    templateUrl: "./app/modules/shopping.cart/views/shopping.cart.state.html",
                    controller: 'shoppingCartCtrl'
                }
            }
        });
});

app.controller('shoppingCartCtrl', ['$scope', 'ShoppingCart', function(scope, Cart){
   scope.cart = Cart.hasOwnProperty('get') ? Cart.get() : {};
   scope.cart.products = scope.cart.products || [];
   
   window.shop = scope;
}]);

app.directive('shoppingCart', ['$compile', '$timeout', 'ShoppingCart', '$rootScope', function($compile, $timeout, Cart, rootScope){
   return {
       restrict: 'EA',
       replace: true,
       controller: 'shoppingCartCtrl',
       templateUrl: './app/modules/shopping.cart/views/shopping.cart.tpl.html',
       link: function( scope, elem, attrs ){
            var parent = $(elem);
            var button = $( parent.children()[parent.children().length-1] );
            var timer;
            var delay = {};
                delay.anim = 500;
                delay.timer = 500;
            
            // Add Cart If There are products
            if (Cart.hasOwnProperty('get') && Cart.get().products.length > 0) cartIsEmpty();
            
            scope.$on('cart:add', function( e, item ){
                // Hide Empty Cart
                console.log("Cart Added", e, item);
                cartIsEmpty();
            });
            
            scope.$on('cart:updated', function(e, cart){
            //   console.log("Updated Cart", cart);
              scope.cart = cart;
              if (cart.products.length <= 0) scope.$emit('cart:empty');
           });
            
            scope.$on('cart:empty', function(ev, bool){
                // Hide Empty Cart
               if (bool) Cart.clear();
               cartIsEmpty();
            });
            
            parent.on('mouseenter', function(e){
               button.stop();
               $timeout.cancel( timer );
               button.addClass('animated fadeIn').delay(delay.anim).removeClass('hidden').queue(function(next){
                   return next();
               });
            });
            
            parent.on('mouseleave', function(e){
               timer = $timeout(function(){
                   console.log("timing out");
                   button.addClass('animated fadeOut').delay(delay.anim).queue(function(next){
                       button.removeClass('animated fadeOut fadeIn').addClass('hidden');
                       return next();
                   });
                   // Hide Empty Cart
                   if (scope.cart.products.length <= 0) parent.addClass('hidden');
                   else parent.removeClass('hidden');
               }, delay.timer);
            });
            
            
            button.on('mouseenter', function(e){
                $timeout.cancel( timer );
                button.stop().removeClass('animated fadeOut hidden') ;
            });
            
            button.on('mouseleave', function(e){
               button.addClass('animated fadeOut').delay(delay.anim).queue(function(next){
                   button.removeClass('animated fadeOut fadeIn').addClass('hidden');
                   return next();
               });
            });
            
            function cartIsEmpty() {
                if (scope.cart.products.length <= 0) return parent.removeClass('animated fadeIn').addClass('animated fadeOut'), true;
                else parent.removeClass('hidden animated fadeOut').addClass('animated fadeIn'), false;
            }
            window.parent = parent;
            window.button = button;
       }
   };
}]);

app.service('ShoppingCart', ['$rootScope', 'DB', function( rootScope, DB ){
    var cart = DB.get('cart') || {};
        cart.products = cart.products || [];
        cart.total = cart.total || 0;
        
    cart.get = function getCart() {
        return !!cart ? cart : DB.save('cart', {});
    };
    
    cart.getPrice = function getCartPrice() {
        return parseFloat(cart.total.toFixed(2));
    };
    
    cart.add = function addToCart( item ) {
        // Increase Total
        if (item.price) cart.total += item.price;
        // Add to cart
        cart.products.push( item );
        rootScope.$broadcast('persist', 'cart', cart);
        rootScope.$broadcast('cart:updated', cart);
        return cart;
    };
    
    cart.remove = function removeFromtCart( idx ) {
        var removed = cart.products.splice( idx, 1)[0];
        // If nothing removed, return cart
        if (!removed || removed.length <= 0) return cart;
        // Validate Price
        if (removed.price) cart.total -= removed.price;
        // Broadcast Removal
        rootScope.$broadcast('persist', 'cart', cart);
        rootScope.$broadcast('cart:updated', cart);
        return removed;
    };
    
    cart.removeId = function removeById( id ) {
        var removed = [];
        cart.get().products.some(function( item, i, a){
            if (item._id === id) return removed.push( cart.remove( i, 1) ), true || false;
        }) || null;
        // console.log("Removed Id", [removed]);
        return removed[0];
    };
    
    cart.clear = function clearCart() {
        cart.products.length = 0;
        cart.total = 0;
        rootScope.$broadcast('persist', 'cart', cart);
        rootScope.$broadcast('cart:updated', cart);
        return cart;
    };
    
    rootScope.$on('cart:add', function( e, item ){
        console.warn("Adding", item, cart);
        cart.add( item );
        console.success('Added ' + item.name);
    });
    
    rootScope.$on('cart:remove', function( e, idx ){
        var item = cart.remove( idx );
        console.alert('Removed ' + item.name);
    });
    
    rootScope.$on('cart:remove:id', function( e, id ){
        var removed = cart.removeId( id ) || null;
        if (removed === null) console.warning('Could Not Remove Item');
        else console.warning('Removed ' + removed.name);
    });
    
    
    window.rootscope = rootScope;
    return window.shoppingCart = cart;
}]);