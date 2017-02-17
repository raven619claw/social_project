var express = require('express');
var app = express();
var server = require('./src/config/server');

server.server(app);
app.listen(3000, function() {
    server.logger.log('verbose', 'app listening on port 3000');
});
