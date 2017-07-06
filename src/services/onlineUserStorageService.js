const _ = require('lodash');

const GLOBALCONSTANTS = require('../config/constants');

let dataObject = {};
dataObject.listOfUsers = {};
dataObject.getUser = function(userID, socketID) {
    if (userID)
        return this.listOfUsers[userID];
    if (socketID)
        return _.findKey(this.listOfUsers, socketID);
};
dataObject.addUser = function(userID, socketID) {
	GLOBALCONSTANTS.LOGGER.LOG('verbose', 'addding user : '+userID+' with socketID : '+socketID);
    this.listOfUsers[userID] = socketID;
    console.log(dataObject.listOfUsers)
    return;
};
dataObject.removeUser = function(userID, socketID) {
	GLOBALCONSTANTS.LOGGER.LOG('verbose', 'removing user : '+userID+' with socketID : '+this.listOfUsers[userID]);
    if (userID)
        delete this.listOfUsers[userID]
    if (socketID)
        delete this.listOfUsers[socketID]
    return;
};

module.exports = dataObject;
