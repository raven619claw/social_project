const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.genericConstraint = (parameter) => {
    return new Promise((resolve, reject) => {
        GLOBALCONSTANTS.LOGGER.LOG('info', 'dB query for genericConstraint running');
        let queryString = '';
        let queryParameters = parameter;
        queryString = `
            CREATE CONSTRAINT ON (p:${queryParameters.label}) ASSERT p.${queryParameters.property} IS UNIQUE
            `;

        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: ' + JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query for genericConstraint successfully done\n result:' + JSON.stringify(result));
                    dbSession.close();
                    resolve({
                        constraintsAdded: result.summary.updateStatistics.constraintsAdded(),
                        parameters: result.summary.statement.parameters
                    });
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error', 'dB query for genericConstraint failed\n result:' + JSON.stringify(err));
                    dbSession.close();
                    reject({
                        created: false,
                        errorCode: err.signature,
                        errorMsg: 'CONSTRAINT Not Created'
                    });
                });
    });
};

module.exports = dataObject;
