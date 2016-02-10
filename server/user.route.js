// User Route
var User = require('../models/_User');

module.exports = {
    get: function(req, res, next) {
        // This Route Only If User Has Admin Role
        res.send("To Be Completed");
    },
    getId: function(req, res, next) {
        var id = req.params.id ? req.params.id : null;
        // If ID Null, return null
        if (!id) return res.status(200).json({message: "Empty"});
        // Perform Query, return user
        User.findOne({ '_id': id }).exec(function( err, user ){
            // Pass Err Object to client for now
            if (err) return res.status(200).json(err), console.log("Error", err);
            else return res.status(200).json(user), console.log("User", user);
        });
    },
    getUser: function(req, res, next) {
        var username = req.params.username ? req.params.username : null;
        // If ID Null, return null
        if (!username) return res.status(200).json({message: "Empty"});
        // Perform Query, return user
        User.search([ 'username', username], function( err, user ){
            // Pass Err Object to client for now
            if (err) return res.status(200).json(err), console.log("Error", err);
            else return res.status(200).json(user), console.log("User", user);
        });
    },
    post: function(req, res, next) {
        // Create Or Populate User
        var user, newUser;
        try {
            if (req.query.user) user = JSON.parse(req.query.user);
            else user = null;
        } catch (e) {
            user = null;
        } finally {
            console.log("Save This User:", user);
            if (user) newUser = new User( user );
        }
        // Sanitize The Ref
        newUser.sanitize();
        // Add Basic User Role
        newUser.roles.push('Registered');
        
        console.log("User After Sanitize", user);
        newUser.save(function(err, response) {
           console.log("Saved User:", response);
           if (err) return res.status(200).json({error: err, response: response});
           res.status(200).json(newUser);
        });
        
    },
    put: function(req, res, next) {
    
    },
    delete: function(req, res, next) {
    
    },
    query: function(req, res, next) {
    
    }
};