const _ = require('lodash');

const GLOBALCONSTANTS = require('../config/constants');

let dataObject = {};
dataObject.listOfUsers = {};
dataObject.listOfRoomUsers = {};
dataObject.getUser = function(userId, socketId) {
    if (userId)
        return this.listOfUsers[userId] || [];
    if (socketId) {
        for (var user in this.listOfUsers) {
            if (this.listOfUsers[user].indexOf(socketId) > -1) {
                return user
            }
        }
        return null
    }

};
dataObject.addUser = function(userId, socketId) {
    GLOBALCONSTANTS.LOGGER.LOG('verbose', 'addding user : ' + userId + ' with socketId : ' + socketId);
    if (this.listOfUsers[userId] instanceof Array) {
        this.listOfUsers[userId].push(socketId);
    } else {
        this.listOfUsers[userId] = [socketId];
    }
    return;
};
dataObject.removeUser = function(socketId, userId) {

    if (userId)
        delete this.listOfUsers[userId]
    if (socketId)
        for (var user in this.listOfUsers) {
            if (this.listOfUsers[user].indexOf(socketId) > -1) {
                GLOBALCONSTANTS.LOGGER.LOG('verbose', 'removing user : ' + user + ' with socketId : ' + socketId);
                this.listOfUsers[user].splice(this.listOfUsers[user].indexOf(socketId), 1)
            }
        }
    return;
};

dataObject.getRoomUsers = function(roomID) {
    if (roomID)
        return this.listOfRoomUsers[roomID] || [];
};

dataObject.addUserToRoomList = function(roomID, userId) {
    if (this.listOfRoomUsers[roomID] instanceof Array) {
        this.listOfRoomUsers[roomID].push(userId);
    } else {
        this.listOfRoomUsers[roomID] = [userId];
    }
};
dataObject.removeUserFromRoomList = function(userId, roomID) {
    if (!userId && roomID)
        delete this.listOfRoomUsers[roomID]
    if (userId && roomID)
        for (var room in this.listOfRoomUsers) {
            if (this.listOfRoomUsers[room].indexOf(userId) > -1) {
                GLOBALCONSTANTS.LOGGER.LOG('verbose', 'removing user : ' + user + ' from room: ' + roomID + ' with socketId : ' + socketId);
                this.listOfRoomUsers[room].splice(this.listOfRoomUsers[room].indexOf(userId), 1)
            }
        }
    return;
};

module.exports = dataObject;
