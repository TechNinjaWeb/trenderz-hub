var User = require('./user.route.js');
var Member = require('../models/_Member.js');
var Product = require('../models/_Product.js');
var Store = require('../models/_Store.js');
var Membership = require('../models/_Membership.js');
var Category = require('../models/_Category.js');

var Schema = require('mongoose').Schema;
var ObjectId = Schema.Types.ObjectId;

var parse = function(data) {
    var d;
    try {
        d = JSON.parse( data );
    } catch (e) {
        d = data;
    } finally {
        return d;
    }
    return d;
}

var capitalize = function( word ) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

var initialize = function() {
    
}

module.exports = {
    initializeDb: function(req, res, next) {
        var user = {
            username: req.params.username, 
            password: req.params.password
        }
        
        if (user.username === 'TechNinja'
            && user.password === 'testing')
                initialize();
    },
    test: {
        post: function(req, res, next) {
            console.log("You've Reached test Route");
            res.status(200).json( {query: req.query, body: req.body});
            next();
        },
        get: function(req, res, next) {
            console.log("You've Reached test Route");
            res.status(200).json( {query: req.query, body: req.body});
            next();
        }
    },
    id: function(req, res, next) {
        res.status(200).json({query: req.query, body: req.body, params: req.params});
    },
    // Really Important Routes Start Here
    users: { get: User.get, post: User.post, getId: User.getId, getUser: User.getUser, login: User.login, put: User.put },
    categories: {
        get: function(req, res, next){
            Category.find({}).exec(function(err, categories){
                if (err) return res.status(200).json([]), console.log("Error", err);
                return res.status(200).json(categories);
            });
        },
        post: function(req, res, next){
            var data = req.query;
            var category = new Category( data );
            
            console.log("Category", category);
            category.save(function(err, response){
                if (err) return res.status(200).json({error: err}), console.log("Error", err);
                return res.status(200).json(response);
            });
        },
        getId: function(req, res, next) {
            var id = req.params.id ? req.params.id : null;
            // If ID Null, return null
            if (!id) return res.status(200).json({message: "Empty"});
            // Perform Query, return user
            Category.findOne({ '_id': id }).exec(function( err, user ){
                // Pass Err Object to client for now
                if (err) return res.status(200).json(err), console.log("Error", err);
                else return res.status(200).json(user);
            });
        },
        getCat: function(req, res, next){
            var response = {};
            var name = req.params.name ? req.params.name : null;
            // Capitalize First Letter
            name = capitalize( name );
            // If ID Null, return null
            if (!name) return res.status(200).json({message: "Empty"});
            console.log("Cat Name to search", name);
            // Find Category ID
            Category.findOne({ 'name': name }).exec(function( err, cat ){
                if (err) return res.status(200).json({message: "Could Not Get Category", error: err});
                // Perform Query, return Products matching category
                Product.find({categories: cat._id}).populate('belongsTo').exec(function(err, products){
                    console.log("Got PRoducts", products, "Cat ID", cat._id);
                    // Build Response
                    response.products = products;
                    response._id = cat._id;
                    response.name = cat.name;
                    response.description = cat.description;
                    response.image = cat.image;
                    // Error Handling and Response                    
                    if (err) return res.status(200).json({message: "Could Not Get Products", error: err, response: response});
                    return res.status(200).json(response);
                });
            });
        },
        getName: function(req, res, next) {
            var name = req.params.name ? req.params.name : null;
            // Capitalize First Letter
            name = capitalize( name );
            // If ID Null, return null
            if (!name) return res.status(200).json({message: "Empty"});
            console.log("Cat Name to search", name);
            // Perform Query, return user
            Category.findOne({ 'name': name }).exec(function( err, cat ){
                console.log("Got Cat", cat);
                // Pass Err Object to client for now
                if (err) return res.status(200).json(err), console.log("Error", err);
                else if (!err && cat) return res.status(200).json(cat);
                else res.status(200).json({message: "Counld not find Category", response: cat, error: err})
            });
        },
        putId: function(req, res, next){ res.send('not implemented')}
    },
    members: {
        get: function(req, res, next){
            Member.find({}).populate('stores').exec(function(err, members){
                if (err) return res.status(200).json([]), console.log("Error", err);
                return res.status(200).json(members);
            });
        },
        post: function(req, res, next){
            var data = req.query,
                member = new Member( data );
            
            // Verify User
            member.verifyUser(data.id || null, function(err, user){
                if (err) return res.status(200).json({message: "Error Verifying User", error: err, response: user});
                // Define If User Has Profile Already                
                var userFound = user.length > 0 ? true : false;
                // Enable New Member
                member.enabled = true;
                // Save The Membership Level
                // console.log("User Found?", userFound, user);
                !userFound ? member.save(function(err, response){
                    if (err) return res.status(200).json({error: err}), console.log("Error", err);
                    return res.status(200).json(response);
                }) : res.status(200).json({message: "User already has a Member File", response: user[0]});
            });
        },
        putId: function(req, res, next){
            var id = req.params.id;
            var data = req.query, stores;
            try {
                if (data.stores) stores = JSON.parse( data.stores );
            } catch (e) {
                stores = data.stores;
            } finally {
                // Delete The Products Ref 
                delete data.stores;
            }
            // Find the member and save
            Member.findOne( id ).exec(function(err, member){
                if (err) return res.status(200).json({message: "Error Verifying User", error: err, response: member});
                // else return res.status(200).json({member: member, stores: stores});
                // Save Stores And Iterate over Other Data
                stores.forEach(function(storeId){
                    // Disable duplicate product additions
                    var inListAlready = member.stores.some(function(_id){ return storeId === _id.toString() });
                    // Debugging
                    // console.log("Found In Store Already?", inListAlready);
                    !inListAlready ? member.stores.push(storeId) : null;
                });
                // Add Additional Properties to the Store
                for (var prop in data) {
                    // Add Each Data Prop Value to the Store
                    member[ prop ] = data[ prop ];
                }
                // Save Member with updated Stores if there was data
                return data ? member.save(function(err, response){
                    if (err) return res.status(200).json({message: "Could not Save Member", response: response, error: err});
                    else return res.status(200).json(response);
                }) : res.status(200).json({message: "There is no Data to save", response: data});
                // Debugging
                // res.status(200).json({ queryData: data, member: member, storesToAdd: stores });
            });
            
        },
        getId: function(req, res, next) {
            var id = req.params.id ? req.params.id : null;
            // If ID Null, return null
            if (!id) return res.status(200).json({message: "Empty"});
            // Perform Query, return user
            Member.findOne({ '_id': id }).exec(function( err, user ){
                // Pass Err Object to client for now
                if (err) return res.status(200).json(err), console.log("Error", err);
                else return res.status(200).json(user);
            });
        }
    },
    membership: {
        get: function(req, res, next){
            Membership.find({}).exec(function(err, memberships){
                if (err) return res.status(200).json([]);
                return res.status(200).json(memberships);
            });
        },
        post: function(req, res, next){
            var data = req.query;
                data.fee = parseFloat(data.fee);
            var membership = new Membership( data );
            // Save The Membership Level
            membership.save(function(err, response){
                if (err) return res.status(200).json({error: err}), console.log("Error", err);
                return res.status(200).json(response);
            });
        }
    },
    products: {
        get: function(req, res, next){
            Product.find({}).exec(function(err, products){
                if (err) return res.status(200).json([]);
                return res.status(200).json(products);
            });
        },
        getId: function(req, res, next) {
            var id = req.params.id ? req.params.id : null;
            // If ID Null, return null
            if (!id) return res.status(200).json({message: "Empty"});
            // Perform Query, return user
            Product.findOne({ '_id': id }).populate('belongsTo categories').exec(function( err, product ){
                // Pass Err Object to client for now
                if (err) return res.status(200).json(err), console.log("Error", err);
                else return res.status(200).json(product);
            });
        },
        post: function(req, res, next){
            var data = req.query,
                product = new Product( data );
            // Save The Membership Level
            product.save(function(err, response){
                if (err) return res.status(200).json({error: err});
                return res.status(200).json(response);
            });
        }
    },
    stores: {
        get: function(req, res, next){
            Store.find({}).populate('membership products').exec(function(err, stores){
                if (err) return res.status(200).json([]);
                return res.status(200).json(stores);
            });
        },
        getId: function(req, res, next) {
            var id = req.params.id ? req.params.id : null;
            // If ID Null, return null
            if (!id) return res.status(44).json({message: "Empty"});
            // Perform Query, return user
            console.log("Getting ID " + id);
            Store.findOne({ '_id': id }).populate('products membership').exec(function( err, store ){
                // Pass Err Object to client for now
                console.log("Store Found:", store);
                if (err) return res.status(200).json(err), console.log("Error", err);
                else return res.status(200).json(store);
            });
        },
        post: function(req, res, next){
            var data = req.query.store;
                data = parse( data );
            var store = new Store( data );
            // Save The Store
            store.save(function(err, response){
                if (err) return res.status(200).json({error: err});
                return res.status(200).json(response);
            });
        },
        putId: function(req, res, next){
            var id = req.params.id;
            var data = req.query, products;
            try {
                if (data.products) products = JSON.parse( data.products );
            } catch (e) {
                products = data.products;
            } finally {
                // Delete The Products Ref 
                delete data.products;
                if (!products || products === undefined) products = [];
            }
            // Debugging
            // console.log("Finding Store: " + id, "With Product", products, "Is Array?", Array.isArray(products));
            // Query DB for ID
            Store.findOne( id ).exec(function(err, store){
                if (err) return res.status(200).json({message: "Could Not Find Store", response: store, error: err});
                // else return res.send({id: id, data: products, store: store});
                // If Product Exists update Data
                console.log("Products", products);
                // Disable duplicate product additions
                var isArray = Array.isArray( products );
                var isString = !isArray
                    && typeof products === 'string' 
                    && products.length > 0
                        ? true : false;
                        
                // If No Products
                isArray ? products.forEach(function(product){
                    // Disable duplicate product additions
                    var inStoreAlready = store.products.some(function(p){ console.log('p === product', p.toString() === product.toString(), p, product); return p === product});
                    // Debugging
                    // console.log("Found In Store Already?", inStoreAlready);
                    !inStoreAlready ? store.products.push(product) : null;
                }) : null;
                
                // If It's A String
                isString && !store.products.some(function(p){ return p._id === products})
                    ? store.products.push( products ) : null;
                // Add Additional Properties to the Store
                for (var prop in data) {
                    // Add Each Data Prop Value to the Store
                    store[ prop ] = data[ prop ];
                }
                // Save Store with updated Products if there was data
                return data ? store.save(function(err, response){
                    if (err) return res.status(200).json({message: "Could not Save Store", response: response, error: err});
                    else return res.status(200).json(response);
                }) : res.status(200).json({message: "There is no Data to save", response: data});
            });
            
        }
    }
};