const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.cancelRequest = (userData) => {
    return new Promise((resolve, reject) => {

        let queryString = `
        MATCH (userFrom:USER { userId:{userFrom} })-[prop:FRIEND]-(userTo:USER { userId:{userTo} })
        WHERE prop.status = 'pending'
        DELETE prop
        `;
        let queryParameters = {
            userFrom: userData.userFrom,
            userTo: userData.userTo
        };
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for cancelRequest running')
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for cancelRequest successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    if (result.summary.counters._stats.relationshipsDeleted)
                        resolve(true)
                    resolve(false);
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for cancelRequest  failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject({
                        created:false,
                        errorCode: err.signature,
                        errorMsg:'cancelRequest request Not completed'
                    });
                });
    });
};

module.exports = dataObject;
