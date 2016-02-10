// Code goes here

var app = angular.module('trenderzHub', ['ui.router', 'ngResource'])
  .controller('appCtrl', ['$scope', '$state', '$stateParams', function(scope, state, $stateParams){
    scope.message = "Hello Plunker!";
    scope.gotTo = function( statename, data ) {
      $stateParams.data = data;
      state.go(statename + data._id, data);
    };
  }]) 
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('stores', {
        abstract: true,
        template: "<div ui-view></div>"
      })
      .state('stores.list', {
        url: '/stores',
        templateUrl: "./stores.list.html",
        controller: function($scope, $http, $resource) {
          // $http.get('./stores.json').success(function(stores){
          //   $scope.stores = stores;
          // });
          
          $resource('https://trenderzhub-techninja.c9users.io/Stores').query(function( stores ){
            console.warn("Got Stores", stores);
            $scope.stores = stores;
          });
        },
       resolve:{
          store: ['$stateParams', function($stateParams){
              console.log($stateParams, "Are Params");
              return $stateParams.data;
          }]
       }
      })
      .state('stores.detail', {
        url: '/:id',
       params: {
         store: function($stateParams){
           return $stateParams.data;
         }
       },
        templateUrl: './store.detail.html',
        controller: function($scope, $stateParams) {
            console.log("Store Details Ctrl", arguments);
            $scope.store = $stateParams.data;
        }
      });
      
      $urlRouterProvider.otherwise('/stores');
  })
  .directive('memberStore', function($http, $stateParams){
    return {
      restrict: 'E',
      replace: true,
      controller: function(){
        this.message = "I am member store ctrl";
        console.log("Controller fired");
      },
      link: function(scope, elem, attrs, ctrls){
        console.log("Linked memberstore", elem);
        // console.log("Params", $stateParams)
        
        // $http.get(attrs.api).success(function(stores){
        //   scope.stores = stores;
        //   scope.member = stores[0]; 
        // });
      }
    };
  });
  // .directive('memberHeader', function(){
  //   return {
  //     restrict: 'E',
  //     replace: true,
  //     transclude: true,
  //     require: ['^memberStore'],
  //     link: function(scope, elem, attrs, ctrls){
  //       console.log("Linked memberheader", ctrls)
  //       scope.get = function(){
  //         return scope;
  //       }
  //     }
  //   }
  // })
  // .directive('memberContent', function(){
  //   return {
  //     restrict: 'E',
  //     replace: true,
  //     transclude: true,
  //     link: function(){console.log("Linked membercontent")}
  //   }
  // })
  // .directive('memberFooter', function(){
  //   return {
  //     restrict: 'E',
  //     replace: true,
  //     transclude: true,
  //     link: function(){console.log("Linked memberfooter")}
  //   }
  // })