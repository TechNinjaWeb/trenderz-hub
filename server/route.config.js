var router = require('express').Router();
var routes = require('./routes');

module.exports = function( app ) {
   
    app.route('/Users')
        .get(routes.users.get)
        .post(routes.users.post);
        
    app.route('/Users/:id')
        .get(routes.users.getId)
        .put(function(){});
        
    app.get('/User/:username', routes.users.getUser);
    
    // Membership Routes
    app.route('/Membership')
        .get(routes.membership.get)
        .post(routes.membership.post);
        
    // Membership Routes
    app.route('/Members')
        .get(routes.members.get)
        .post(routes.members.post);
    
    app.route('/Member/:id')
        .get(routes.members.getId)
        .put(routes.members.putId);
    
    // Products Routes
    app.route('/Products')
        .get(routes.products.get)
        .post(routes.products.post);
    
    app.get('/Products/:id', routes.products.getId);
    
    // Stores Routes
    app.route('/Stores')
        .get(routes.stores.get)
        .post(routes.stores.post);
    
    app.route('/Stores/:id')
        .get(routes.stores.getId)
        .put(routes.stores.putId);
    
    // Category Routes
    app.route('/Categories')
        .get(routes.categories.get)
        .post(routes.categories.post);
        
    app.route('/Categories/:name')
        .get(routes.categories.getCat)
        .put(routes.categories.putId);
        
    // Default Route Renderer
    app.get('/', function(req, res, next) {
        console.log('Basic Get');
        res.render('index', {});
    });
    // Return App To Caller
    return app;
};