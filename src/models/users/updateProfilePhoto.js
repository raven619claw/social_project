const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.updateProfilePhoto = (userData) => {
    return new Promise((resolve, reject) => {

        let queryString = `
        MATCH (user:USER { userId:{userid} })-[:MEDIA]-(media:MEDIA {id: {mediaid} })
        OPTIONAL MATCH (user)-[:MEDIA]-(currentProfileImg:MEDIA {isProfilePhoto : true})
        SET media.isProfilePhoto = true,
            currentProfileImg.isProfilePhoto = false
        `;
        let queryParameters = {
            userid: userData.userid,
            mediaid: userData.mediaid
        };
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for updateProfilePhoto running')
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for updateProfilePhoto successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    if (result.summary.counters._stats.propertiesSet)
                        resolve(true)
                    resolve(false);
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for updateProfilePhoto  failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject({
                        removed: false,
                        errorCode: err.signature,
                        errorMsg: 'updateProfilePhoto request Not completed'
                    });
                });
    });
};

module.exports = dataObject;
