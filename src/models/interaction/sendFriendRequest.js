const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.sendFriendRequest = (userData) => {
    return new Promise((resolve, reject) => {

        let queryString = `
        MATCH (userFrom:USER { userId:{userFrom} }),(userTo:USER { userId:{userTo} })
        MERGE (userFrom)-[prop:FRIEND]->(userTo)        
        ON CREATE SET prop.status='pending'
        RETURN userFrom,userTo,prop
        `;
        let queryParameters = {
            userFrom: userData.userFrom,
            userTo: userData.userTo
        };
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for friend request creation running')
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for friend request creation successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    if (result.summary.counters._stats.relationshipsCreated)
                        resolve(true)
                    resolve(false);
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for friend request creation failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject({
                        created:false,
                        errorCode: err.signature,
                        errorMsg:'friend request Not Created'
                    });
                });
    });
};

module.exports = dataObject;
