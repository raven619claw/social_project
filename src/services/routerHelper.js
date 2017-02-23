//node modules
const session = require('express-session');

//built in globals
const GLOBALCONSTANTS = require('../config/constants');
const dbSession = require('../services/neo4jConnector');
const userAuthFromDB = require('../models/getUserAuth');


let userAuth = (userData, sessionObject) => {
    return new Promise((resolve, reject) => {
        GLOBALCONSTANTS.LOGGER.LOG('data', 'request for user authentication received');
        userData.success = false;
        switch (userData.logintype) {
            case 'login':
                GLOBALCONSTANTS.LOGGER.LOG('data', 'request for user login authentication received');
                userAuthFromDB.getUser(dbSession, userData)
                    .then((userDataReceived) => {
                        if (userDataReceived) {
                            userData.success = true;
                        }
                        GLOBALCONSTANTS.LOGGER.LOG('data', 'returned userData to routes' + JSON.stringify(userData));
                        resolve(userData);
                    });
                break;
            case 'logout':
                GLOBALCONSTANTS.LOGGER.LOG('data', 'request for user logout authentication received');
                GLOBALCONSTANTS.LOGGER.LOG('data', 'user logged out' + sessionObject.name);
                userData = false;
                GLOBALCONSTANTS.LOGGER.LOG('data', 'returned userData to routes' + JSON.stringify(userData));
                resolve(userData);
                break;
        }
    });
};


let getSessionObject = (sessionObject, req) => {
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

let setSessionObject = (sessionObject, userData) => {
    GLOBALCONSTANTS.LOGGER.LOG('data', 'request for setting user session received');
    sessionObject.name = userData.name || '';
    sessionObject.loginStatus = userData.success || false;

    GLOBALCONSTANTS.LOGGER.LOG('data', 'session object returned' + JSON.stringify(sessionObject));
    return sessionObject;
};

let getUserDataFromSession = (sessionObject) => {
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
module.exports = {
    userAuth,
    getSessionObject,
    setSessionObject,
    getUserDataFromSession
};
