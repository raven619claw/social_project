const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.unFriend = (userData) => {
    return new Promise((resolve, reject) => {

        let queryString = `
        MATCH (userFrom:USER { userId:{userFrom} })-[prop:FRIEND]-(userTo:USER { userId:{userTo} })
        DELETE prop
        `;
        let queryParameters = {
            userFrom: userData.userFrom,
            userTo: userData.userTo
        };
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for unfriend running')
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for unfriend successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    if (result.summary.counters._stats.relationshipsDeleted)
                        resolve(true)
                    resolve(false);
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for unfriend  failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject({
                        created:false,
                        errorCode: err.signature,
                        errorMsg:'unfriend request Not completed'
                    });
                });
    });
};

module.exports = dataObject;
