const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.acceptFriendRequest = (userData) => {
    return new Promise((resolve, reject) => {

        let queryString = `
        MATCH (userFrom:USER { userId:{userFrom} })-[prop:FRIEND]-(userTo:USER { userId:{userTo} })
        WHERE prop.from = {userFrom}      
        SET prop.status='accepted'
        RETURN userFrom,userTo,prop
        `;
        let queryParameters = {
            userFrom: userData.userFrom,
            userTo: userData.userTo
        };
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for friend request acceptance running')
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for friend request acceptance successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    if (result.summary.counters._stats.propertiesSet)
                        resolve(true)
                    resolve(false);
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for friend request acceptance failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject({
                        created:false,
                        errorCode: err.signature,
                        errorMsg:'friend request Not Created'
                    });
                });
    });
};

module.exports = dataObject;
