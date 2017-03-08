const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.getUserAuth = (userData) => {
    return new Promise((resolve, reject) => {
        let queryString = "MATCH (user:USER) WHERE user.name={name} AND user.password={password} RETURN user";
        let queryParameters = { name: userData.username, password: userData.password };
        GLOBALCONSTANTS.LOGGER.LOG('info','dB query for user auth running')
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: '+JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                GLOBALCONSTANTS.LOGGER.LOG('data','dB query for user auth successfully done\n result:'+JSON.stringify(result));
                    dbSession.close();
                    if (result.records[0] && result.records[0]._fields[0].properties)
                        resolve(result.records[0]._fields[0].properties)
                    resolve(false);
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error','dB query for user auth failed\n result:'+JSON.stringify(err));
                    dbSession.close();
                    reject(false);
                });
    });
};

module.exports = dataObject;