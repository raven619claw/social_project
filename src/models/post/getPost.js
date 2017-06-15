const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
const completeAWSUrl = require('../../services/helpers/completeAWSUrl');
let dataObject = {};
dataObject.getPost = (postID) => {
    return new Promise((resolve, reject) => {
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for get post  running');
        let queryString = '';
        let queryParameters = {};
        queryString = `
            MATCH (media)-[:MEDIA]-(post:POST)-[]-(user) 
            WHERE post.id={id} 
            RETURN post,user,media
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
                    if (result && result.records) {
                        let postDetails = [];
                        result.records.forEach((data) => {
                            let postData = data.get('post').properties;
                            postData.media = data.get('media').properties
                            let resultData = {
                                postData: postData,
                                userDetails: {
                                    username: data.get('user').properties.username,
                                    userId: data.get('user').properties.userId,
                                }

                            };
                            resultData.postData.media = completeAWSUrl(resultData.postData.media);
                            postDetails.push(resultData);
                        });
                        resolve(postDetails)
                    }
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query get post  failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject(false);
                });
    });
};

module.exports = dataObject;
