//node modules
const express = require('express');
const app = express();

//built in globals
require('dotenv').config();
const server = require('./src/config/server');
const GLOBALCONSTANTS = require('./src/config/constants');

server.server(app);
app.listen(GLOBALCONSTANTS.APPCONFIG.PORT, ()=> {
    GLOBALCONSTANTS.LOGGER.LOG('verbose', 'app listening on port '+GLOBALCONSTANTS.APPCONFIG.PORT);
});
