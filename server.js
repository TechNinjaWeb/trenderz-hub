var PORT = process.env.PORT || 9000,
    http = require('http'),
    parse  = require('body-parser'),
    express = require('express'),
    app = require('./express.config.js'),
    colors = require('colors'),
    logger = require('tracer').colorConsole({
        filters : {
            log : colors.gray,
            trace : colors.magenta,
            debug : colors.blue,
            info : colors.green,
            warn : colors.yellow,
            error : [ colors.red, colors.bold ]
        }
    });
// Set Body Parsing
app.use(parse.json());

// Require Routes
require('./server/route.config.js')( app );

// Listen To Traffic
http.createServer(app).listen(PORT, function() {
    logger.trace("Socket & Express Server Started on port %d in %s mode", this.address().port, app.settings.env);
});