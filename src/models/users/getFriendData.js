const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.getFriendData = (userData) => {
    return new Promise((resolve, reject) => {

        let queryString = `
        MATCH (userFrom:USER { userId:{userFrom} })-[prop:FRIEND]-(userTo:USER)
        WHERE prop.status=~ {status} AND userTo.userId =~ {userTo}
        RETURN userTo,prop.status
        `;
        let queryParameters = {
            userFrom: userData.userFrom,
            userTo: userData.userTo || ''+'.*',
            status:userData.status || ''+'.*'
        };
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for getting friend data running')
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for getting friend data successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    let userDetails=[];
                    result.records.forEach((user) => {
                            let propertiesToPush={
                                username:user._fields[user._fieldLookup["userTo"]].properties.username,
                                userId:user._fields[user._fieldLookup["userTo"]].properties.userId,
                                status:user._fields[user._fieldLookup["prop.status"]],
                            }
                            userDetails.push(propertiesToPush)
                        });
                        resolve(userDetails)
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for getting friend data failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject({
                        created:false,
                        errorCode: err.signature,
                        errorMsg:'could not get friend data'
                    });
                });
    });
};

module.exports = dataObject;
