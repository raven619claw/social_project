const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.createUser = (userData) => {
    return new Promise((resolve, reject) => {
        let queryString = "MERGE (user:USER { name: {name}}) ON CREATE SET user.password= {password} RETURN user";
        let queryParameters = { name: userData.name, password: userData.password };
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
