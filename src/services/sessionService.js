
//built in globals
const GLOBALCONSTANTS = require('../config/constants');

let sessionObject ={};

sessionObject.getSessionObject = (sessionObject, req) => {
    GLOBALCONSTANTS.LOGGER.LOG('data', 'request for user session received');
    if (!sessionObject) {
        GLOBALCONSTANTS.LOGGER.LOG('data', 'new user session object created');
        sessionObject = req.session;
        sessionObject.name = '';
        sessionObject.loginStatus = false;
        GLOBALCONSTANTS.LOGGER.LOG('data', 'session value' + JSON.stringify(sessionObject));
    }
    GLOBALCONSTANTS.LOGGER.LOG('data', 'session object returned' + JSON.stringify(sessionObject));
    return sessionObject;
};

sessionObject.setSessionObject = (sessionObject, userData) => {
    GLOBALCONSTANTS.LOGGER.LOG('data', 'request for setting user session received');
    sessionObject.name = userData.name || '';
    sessionObject.loginStatus = userData.success || false;

    GLOBALCONSTANTS.LOGGER.LOG('data', 'session object returned' + JSON.stringify(sessionObject));
    return sessionObject;
};

sessionObject.getUserDataFromSession = (sessionObject) => {
    GLOBALCONSTANTS.LOGGER.LOG('data', 'request for getting userData from session');
    let userData = false;
    if (sessionObject) {
        if (sessionObject.loginStatus) {
            userData = {
                name: sessionObject.name,
                success: true
            };
            GLOBALCONSTANTS.LOGGER.LOG('data', 'userData object returned' + JSON.stringify(userData));
            return userData
        }
    }
    GLOBALCONSTANTS.LOGGER.LOG('data', 'userData object returned' + JSON.stringify(userData));
    return userData;
};

module.exports = sessionObject;
