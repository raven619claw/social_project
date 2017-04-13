const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.getUserPosts = (data) => {
    return new Promise((resolve, reject) => {
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for user post retrieval running');
        let queryString = '';
        let queryParameters = {};

        queryString = `
            MATCH (user:USER {userId : { userid } })-[:POSTED]->(post:POST)
            RETURN post
            `;
        queryParameters.userid = data.userid;

        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for user post details successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    if (result && result.records) {
                        let postDetails = [];
                        result.records.forEach((post) => {
                            postDetails.push(post._fields[0].properties)
                        });
                        resolve(postDetails)
                    }
                    resolve(false);
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for user post details failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject(false);
                });
    });
};

module.exports = dataObject;
