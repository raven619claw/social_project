const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.getUserSuggestions = (userData) => {
    return new Promise((resolve, reject) => {

        let queryString = `
        MATCH (userFrom:USER {userId:{userFrom}}),(userTo:USER)
        WHERE NOT (userFrom)-[:FRIEND]->(userTo) AND userFrom.userId <> userTo.userId
        RETURN userTo
        `;
        let queryParameters = {
            userFrom: userData.userFrom,
        };
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for getting friend suggestions running')
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for getting friend suggestions successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    let userDetails=[];
                    result.records.forEach((user) => {
                            let propertiesToPush={
                                username:user._fields[user._fieldLookup["userTo"]].properties.username,
                                userId:user._fields[user._fieldLookup["userTo"]].properties.userId,
                            }
                            userDetails.push(propertiesToPush)
                        });
                        resolve(userDetails)
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for getting friend suggestions failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject({
                        created:false,
                        errorCode: err.signature,
                        errorMsg:'could not get friend suggestions'
                    });
                });
    });
};

module.exports = dataObject;
