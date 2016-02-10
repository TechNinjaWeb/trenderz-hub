var path = require('path'),
    mongo = require('mongoose'),
    express = require('express'),
    sessions = require("client-sessions"),
    compression = require('compression'),
    app = express();

var compressionFilter = function(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }

    // fallback to standard filter function
    return compression.filter(req, res);
};

// Connect To Mongo
mongo.connect('mongodb://localhost/trenderz');


app.set('views', path.join(__dirname, '/www'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(compression({
    filter: compressionFilter,
    level: -1
}));

app.use(express.static(__dirname + '/www'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/scripts', express.static(__dirname + '/bower_components'));
app.use('/css', express.static(__dirname + '/bower_components'));
app.use('/font', express.static(__dirname + '/bower_components'));

app.use(sessions({
    cookieName: 'THCookie', // cookie name dictates the key name added to the request object 
    secret: 'yovegottabekiddingmeicantbelieveitsnotbutter', // should be a large unguessable string 
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms 
    activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds 
}));


// app.use(function(req, res, next) {
//     if (true) console.log("It's true", req.THCookie);
//     if (req.THCookie.hasOwnProperty("nope")) {
//         res.setHeader('X-Seen-You', 'true');
//     }
//     else {
//         // setting a property will automatically cause a Set-Cookie response 
//         // to be sent 
//         req.THCookie.nope = true;
//         res.setHeader('X-Seen-You', 'false');
//     }
    
//     next();
// });

// app.use(function(req, res, next){
//     console.log("Cookie Got", req.THCookie);
//     next();
// })

module.exports = app;