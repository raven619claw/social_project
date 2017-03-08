const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.getUser = (data) => {
    return new Promise((resolve, reject) => {
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for user retrieval running');
        let queryString = '';
        let queryParameters = {};
        if (data.name == undefined || data.name == '') {
            queryString = "MATCH (user:USER) RETURN user";
        } else {
            queryString = "MATCH (user:USER) WHERE user.name={name} RETURN user";
            queryParameters.name = data.name;
        }
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: '+JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for user details successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    if (result && result.records) {
                        let userDetails = [];
                        result.records.forEach((user) => {
                            userDetails.push(user._fields[0].properties)
                        });
                        resolve(userDetails)
                    }
                    resolve(false);
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for user details failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject(false);
                });
    });
};

module.exports = dataObject;
