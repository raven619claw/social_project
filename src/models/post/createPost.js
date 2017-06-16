const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.createPost = (postData) => {
    return new Promise((resolve, reject) => {
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for post creation running');
        let queryString = '';
        let queryParameters = {};
        queryString = `
            MATCH (user:USER {userId:{userId}})
            MERGE (user)-[:POSTED]->(post:POST 
            {
                dateCreated:{dateCreated},
                content:{content},
                privacy:{privacyFlag},
                medium:{medium},
                id:{id}

            })
            FOREACH (media in {media} | 
                MERGE (post)-[:MEDIA]->(:MEDIA {
                    url:media,
                    isProfilePhoto:false
                })<-[:MEDIA]-(user)
            )
            RETURN user,post
            `;
        queryParameters = {
            userId: postData.userId,
            dateCreated: postData.dateCreated,
            content: postData.content,
            media: postData.media,
            privacyFlag: postData.privacyFlag,
            medium: postData.medium,
            id: postData.id
        };
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for post creation successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    resolve(result.records[0]._fields[1].properties.id);
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query post creation failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject(false);
                });
    });
};

module.exports = dataObject;
