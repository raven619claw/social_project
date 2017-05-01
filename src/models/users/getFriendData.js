const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.getFriendData = (userData) => {
    return new Promise((resolve, reject) => {

        let queryString = `
        MATCH (userFrom:USER { userId:{userFrom} })-[prop:FRIEND]-(userTo:USER)
        WHERE prop.status=~ {status} AND userTo.userId =~ {userTo}
        RETURN userTo,prop
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
                        console.log(user.get('prop').properties)
                            let propertiesToPush={
                                username:user.get('userTo').properties.username,
                                userId:user.get('userTo').properties.userId,
                                status:user.get('prop').properties.status,
                                requestData:{
                                    from:user.get('prop').properties.from,
                                    to:user.get('prop').properties.to
                                }
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
