const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.removeProfilePhoto = (userData) => {
    return new Promise((resolve, reject) => {

        let queryString = `
        MATCH (user:USER { userId:{userid} })-[:MEDIA]-(media:MEDIA {isProfilePhoto:true})
        SET media.isProfilePhoto = false
        `;
        let queryParameters = {
            userid: userData.userid
        };
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for removeProfilePhoto running')
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for removeProfilePhoto successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    if (result.summary.counters._stats.propertiesSet)
                        resolve(true)
                    resolve(false);
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for removeProfilePhoto  failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject({
                        removed: false,
                        errorCode: err.signature,
                        errorMsg: 'removeProfilePhoto request Not completed'
                    });
                });
    });
};

module.exports = dataObject;
