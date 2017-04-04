const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.checkUser = (user) => {
    return new Promise((resolve, reject) => {
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for checking user existance running');
        let queryString = '';
        let queryParameters = {};
            queryString = `
            MATCH (user:USER) 
            WHERE user.username = {username} OR user.email = {email}
            RETURN user
            `;
            queryParameters = user;
            console.log(queryParameters);
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: '+JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for user details successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    if (result && result.records && result.records.length > 0) {
                        resolve(true)
                    }
                    resolve(false);
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for user details failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject(false);
                });
    });
};

module.exports = dataObject;
