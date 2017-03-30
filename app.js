//node modules
const express = require('express');
const app = express();

//built in globals
require('dotenv').config();
const server = require('./src/config/server');
const GLOBALCONSTANTS = require('./src/config/constants');

server.server(app);
app.listen(process.env.APP_PORT, ()=> {
    GLOBALCONSTANTS.LOGGER.LOG('verbose', 'app listening on port '+process.env.APP_PORT);
});
