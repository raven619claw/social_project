//node modules
require('dotenv').config();
const express = require('express');
const app = express();


//built in globals
const server = require('./src/config/server');
const GLOBALCONSTANTS = require('./src/config/constants');
const socketService = require(GLOBALCONSTANTS.ROOTPATH + '/services/socketService');

server.server(app);
let httpServerObj = app.listen(GLOBALCONSTANTS.APPCONFIG.PORT, () => {
    GLOBALCONSTANTS.LOGGER.LOG('verbose', 'app listening on port ' + GLOBALCONSTANTS.APPCONFIG.PORT);
});
socketService.setup(httpServerObj);
