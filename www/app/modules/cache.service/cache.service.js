var app = angular.module('cache.service', [])
    .service("DB", function($rootScope) {
        var DB = {
            save: function save(property, value) {
                var data;
                try {
                    if (typeof value === 'object' && value.hasOwnProperty('$$hashKey')) delete value.$$hashKey;
                    data = JSON.stringify(value);
                } catch (e) {
                    data = value;
                } finally {
                    localStorage[property] = data;
                    return this.get(property);
                }
            },
            get: function get(property) {
                var data;
                var store = localStorage[property];
                try {
                    data = JSON.parse(store);
                    if (typeof store === 'object' && store.hasOwnProperty('$$hashKey')) delete store.$$hashKey;
                } catch (e) {
                    data = localStorage[property];
                } finally {
                    return data
                }
            }
        }

        $rootScope.$on('persist', function( event, property, data ){
            DB.save(property, data);
            var eventname = 'persisted:' + property;
            console.info("Persisted:", [event, property, data, eventname]);
            $rootScope.$broadcast( eventname, data );
        });

        return DB;
    });