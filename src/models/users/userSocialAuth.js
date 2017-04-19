const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.socialAuth = (userData) => {
    return new Promise((resolve, reject) => {
        let queryString = `
        MERGE ( user:USER { userId : {userId} } )-[:USERINFO]->(info:PROFILEINFO)
        ON CREATE SET user.password = {password} ,
                      info.firstName = {firstName} ,
                      info.lastName = {lastName} ,
                      user.username = {username} ,
                      user.userType = {userType} ,
                      info.email = {email},
                      user.userId = {userId}

        RETURN user
        `;
        let queryParameters = {
            username: userData.username,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            userType: userData.userType,
            userId: userData.userId
        };
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for user social auth running')
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for user social auth successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    if (result.summary.counters._stats.nodesCreated)
                        resolve({ user: result.records[0]._fields[0].properties, created: true })
                    resolve({ user: result.records[0]._fields[0].properties, created: false });
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for user social auth failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject(false);
                });
    });
};

module.exports = dataObject;
