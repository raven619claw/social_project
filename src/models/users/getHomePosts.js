const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
const completeAWSUrl = require('../../services/helpers/completeAWSUrl');
let dataObject = {};
dataObject.getHomePosts = (data) => {
    return new Promise((resolve, reject) => {
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for homepage post retrieval running');
        let queryString = '';
        let queryParameters = {};

        queryString = `
            MATCH (entity:USER {userId : { userid } })-[:POSTED]->(post:POST)
            OPTIONAL MATCH (post)-[:MEDIA]-(media)
            OPTIONAL MATCH (entity)-[:MEDIA]-(profilePhoto:MEDIA {isProfilePhoto:true})

            WITH collect({entity:entity, post: post, media: media,profilePhoto: profilePhoto}) as row1

            MATCH (user:USER {userId : { userid } })-[prop:FRIEND]-(entity)-[:POSTED]-(post:POST)
            WHERE prop.status = 'accepted'
            OPTIONAL MATCH (post)-[:MEDIA]-(media)
            OPTIONAL MATCH (entity)-[:MEDIA]-(profilePhoto:MEDIA {isProfilePhoto:true})

            WITH row1 + collect({entity:entity, post: post, media: media,profilePhoto: profilePhoto}) as allRows

            UNWIND allRows as row
            WITH row.entity as entity,row.post as post,row.media as media,row.profilePhoto as profilePhoto
            
            RETURN post,entity,profilePhoto,collect(media) as media
            
            ORDER BY post.dateCreated DESC
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
                            let postData = data.get('post').properties;
                            postData.media = data.get('media')
                            let resultData = {
                                postData: postData,
                                userDetails: {
                                    username: data.get('entity').properties.username,
                                    userId: data.get('entity').properties.userId,
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
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for homepage post details failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject(false);
                });
    });
};

module.exports = dataObject;
