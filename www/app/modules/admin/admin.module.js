var app = angular.module('th.admin', ['ui.router', 'ngResource']);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('admin', {
            abstract: true,
            url: '/admin',
            views: {
                '@': {
                    template: "<div ui-view='body'></div>"
                },
                'navigation@': {
                    templateUrl: "./app/modules/admin/views/template/admin.navigation.html"
                },
                'footer@': {
                    templateUrl: "./app/views/template/home.footer.html"
                }
            }
        })
        .state('admin.dash', {
            url: '/dash',
            views: {
                'body@admin': {
                    templateUrl: './app/modules/admin/views/pages/admin.dash.html'
                }
            }
        })
})