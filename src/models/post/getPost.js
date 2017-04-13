const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.getPost = (postID) => {
    return new Promise((resolve, reject) => {
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for get post  running');
        let queryString = '';
        let queryParameters = {};
        queryString = `
            MATCH (post:POST) 
            WHERE post.id={id} 
            RETURN post
            `;
        queryParameters = {
            id: postID
        };
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for get post  successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    resolve(result.records[0]._fields[0].properties);
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query get post  failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject(false);
                });
    });
};

module.exports = dataObject;
