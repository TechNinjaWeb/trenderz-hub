var app = angular.module('th.account', ['ui.router', 'ngResource']);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('account', {
            abstract: true,
            url: '/account',
            views: {
                '@': {
                    template: "<div ui-view='body'></div>"
                },
                'navigation@': {
                    templateUrl: "./app/modules/account/views/template/account.navigation.html"
                },
                'footer@': {
                    templateUrl: "./app/views/template/home.footer.html"
                }
            }
        })
        .state('account.page', {
            url: '/page',
            views: {
                'body@account': {
                    templateUrl: './app/modules/account/views/pages/account.page.html'
                }
            }
        })
        .state('account.orders', {
            url: '/orders',
            views: {
                'body@account': {
                    templateUrl: './app/modules/account/views/pages/account.orders.html'
                }
            }
        })
        .state('account.store', {
            url: '/store',
            views: {
                'body@account': {
                    templateUrl: './app/modules/account/views/pages/account.store.html'
                }
            }
        })
        .state('account.settings', {
            url: '/settings',
            views: {
                'body@account': {
                    templateUrl: './app/modules/account/views/pages/account.settings.html'
                }
            }
        })
});