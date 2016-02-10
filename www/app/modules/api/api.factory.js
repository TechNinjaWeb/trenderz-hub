var app = angular.module('th.api', []);

app.service('Stores', ['$resource', function($resource) {
    return window.resource = $resource('https://trenderzhub-techninja.c9users.io/Stores/:id', {id: '@id'}, 
    {
        getId: {
            method: 'GET',
            isArray: true,
            id: '@id'
        }
    });
}]);

app.service('Products', ['$resource', function($resource) {
    return window.resource = $resource('https://trenderzhub-techninja.c9users.io/Products/:id', {id: '@id'}, 
    {
        getId: {
            method: 'GET',
            isArray: true,
            id: '@id'
        }
    });
}]);