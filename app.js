//node modules
const express = require('express');
const app = express();

//built in globals
const server = require('./src/config/server');
const GLOBALCONSTANTS = require('./src/config/constants');

server.server(app);
app.listen(3000, ()=> {
    GLOBALCONSTANTS.LOGGER.LOG('verbose', 'app listening on port 3000');
});
