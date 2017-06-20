const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.updateBlob = (postData) => {
    return new Promise((resolve, reject) => {
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for update blob running');
        let queryString = '';
        let queryParameters = {};
        queryString = `
            MATCH (user:USER {userId:{userId}})
            FOREACH (media in {media} | 
                MERGE (user)-[:MEDIA]->(:MEDIA {
                    url:media,
                    isProfilePhoto:false,
                    id:split(media,'_')[0]
                })
            )
            `;
        queryParameters = {
            userId: postData.userid,
            media: postData.media
        };
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for update blob successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    resolve(result.summary.counters._stats.nodesCreated);
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query update blob failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject(false);
                });
    });
};

module.exports = dataObject;
