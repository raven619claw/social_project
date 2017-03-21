const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.createUser = (userData) => {
    return new Promise((resolve, reject) => {
        let queryString = `
        MERGE ( user:USER { username : {username} } ) 
        ON CREATE SET user.password = {password} ,
                      user.firstName = {firstName} ,
                      user.lastName = {lastName} ,
                      user.username = {username} ,
                      user.userType = {userType} ,
                      user.email = {email}
        RETURN user
        `;
        let queryParameters = { 
            username : userData.username , 
            password : userData.password ,
            firstName : userData.firstName ,
            lastName : userData.lastName ,
            email : userData.email ,
            userType : userData.userType
        };
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for user creation running')
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for user creation successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    if (result.summary.counters._stats.nodesCreated)
                        resolve({ user: result.records[0]._fields[0].properties, created: true })
                    resolve({ user: result.records[0]._fields[0].properties, created: false });
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for user creation failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject(false);
                });
    });
};

module.exports = dataObject;
