const request = require('request');
//built in globals
const GLOBALCONSTANTS = require('../config/constants');

let userAuth = (userData, sessionObject) => {
    return new Promise((resolve, reject) => {
        GLOBALCONSTANTS.LOGGER.LOG('data', 'request for user authentication received');
        userData.success = false;
        switch (userData.logintype) {
            case 'login':
                GLOBALCONSTANTS.LOGGER.LOG('data', 'request for user login authentication received');
                var formData = {
                    name: userData.name,
                    password: userData.password
                };

                request.post({
                        url: 'http://127.0.0.1:3000/apis/userAuth',
                        form: formData
                    },
                    function(err, httpResponse, body) {
                        body = JSON.parse(body);
                        if (body) {
                            userData.loginStatus = body.loginStatus;
                            if (body.loginStatus.password) {
                                GLOBALCONSTANTS.LOGGER.LOG('data', 'user logged in' + userData.name);
                                userData.success = true;
                            }
                            GLOBALCONSTANTS.LOGGER.LOG('data', 'returned userData to routes' + JSON.stringify(userData));
                            resolve(userData);
                        } else {
                            reject(false);
                        }

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
