const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
const completeAWSUrl = require('../../services/helpers/completeAWSUrl');
let dataObject = {};
dataObject.getUserPosts = (data) => {
    return new Promise((resolve, reject) => {
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for user post retrieval running');
        let queryString = '';
        let queryParameters = {};

        queryString = `
            MATCH (user:USER {userId : { userid } })-[:POSTED]->(post:POST)
            OPTIONAL MATCH (post)-[:MEDIA]-(media)
            OPTIONAL MATCH (user)-[:MEDIA]-(profilePhoto:MEDIA {isProfilePhoto:true})
            RETURN post,user,profilePhoto,collect(media) as media
            ORDER BY post.dateCreated DESC
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
                        result.records.forEach((data) => {
                            let postData = data.get('post').properties;
                            postData.media = data.get('media');
                            let resultData = {
                                postData: postData,
                                userDetails: {
                                    username: data.get('user').properties.username,
                                    userId: data.get('user').properties.userId,
                                    profilePhoto: data.get('profilePhoto') && completeAWSUrl([data.get('profilePhoto')]) || null
                                }
                            };
                            resultData.postData.media = completeAWSUrl(resultData.postData.media);
                            postDetails.push(resultData);
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
