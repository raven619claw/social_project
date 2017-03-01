//built in globals
const GLOBALCONSTANTS = require('../config/constants');
const dbSession = require('../services/neo4jConnector');
const userAuthFromDB = require('../models/users/getUserAuth');


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
                    }, (err) => {
                        reject(err);
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

module.exports = {
    userAuth
};
