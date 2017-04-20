const GLOBALCONSTANTS = require('./constants');
const genericConstraint = require('../models/dbConstraints/genericConstraint.js');

let constraintsToAdd = [{
    label: 'USER',
    property: 'username'
},{
    label: 'USER',
    property: 'userId'
}, {
    label: 'PROFILEINFO',
    property: 'email'
}];

constraintsToAdd.forEach((constraintToAdd) => {
    genericConstraint.genericConstraint(constraintToAdd)
        .then((result) => {
                if (result.constraintsAdded) {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'constraint created for: ' + JSON.stringify(result.parameters));
                } else {
                    GLOBALCONSTANTS.LOGGER.LOG('data', 'constraint existing for: ' + JSON.stringify(result.parameters));
                }
            },
            (error) => {
                GLOBALCONSTANTS.LOGGER.LOG('error', 'constraint could not be created for: ', parameter);
            });
});
