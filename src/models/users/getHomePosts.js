const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.getHomePosts = (data) => {
    return new Promise((resolve, reject) => {
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for homepage post retrieval running');
        let queryString = '';
        let queryParameters = {};

        queryString = `
            MATCH (user:USER {userId : { userid } })-[]-(entity)-[:POSTED]-(post:POST)
            RETURN post,entity
            `;
        queryParameters.userid = data.userid;

        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for homepage post details successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    if (result && result.records) {
                        let postDetails = [];
                        result.records.forEach((data) => {
                            let resultData = {
                                postData: data.get('post').properties,
                                userDetails: {
                                    username: data.get('entity').properties.username,
                                    userId: data.get('entity').properties.userId,
                                }

                            };
                            postDetails.push(resultData);
                        });
                        resolve(postDetails)
                    }
                    resolve(false);
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for homepage post details failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject(false);
                });
    });
};

module.exports = dataObject;
