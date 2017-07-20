const socket = require('socket.io');
const md5 = require('md5');
const redis = require('redis').createClient;
const adapter = require('socket.io-redis');
const GLOBALCONSTANTS = require('../config/constants');
const pub = redis(GLOBALCONSTANTS.APPCONFIG.REDIS_PORT, GLOBALCONSTANTS.APPCONFIG.REDIS_HOST, { auth_pass: GLOBALCONSTANTS.APPCONFIG.REDIS_PASSWORD });
const sub = redis(GLOBALCONSTANTS.APPCONFIG.REDIS_PORT, GLOBALCONSTANTS.APPCONFIG.REDIS_HOST, { auth_pass: GLOBALCONSTANTS.APPCONFIG.REDIS_PASSWORD });

const onlineUserStorageService = require('./onlineUserStorageService');
const mongoDbService = require('./mongoDBService');

let ioWrapper = {};
ioWrapper.setup = (app) => {
    let io = socket(app);
    io.adapter(adapter({ pubClient: pub, subClient: sub }));
    io.on('connection', (socket) => {
        GLOBALCONSTANTS.LOGGER.LOG('verbose', 'socket connection made ' + socket.id);
        if (socket.handshake.query.userid)
            onlineUserStorageService.addUser(socket.handshake.query.userid, socket.id);
        socket.on('chatInitClient', (data) => {
            if (data.origin) {
                data.roomId = ioWrapper.generateRoomID(data.users);
                data.chatId = data.roomId;

                data.users.forEach((user) => {
                    onlineUserStorageService.addUserToRoomList(data.roomId, user);
                    onlineUserStorageService.getUser(user).forEach((userSocketID) => {
                        io.of('/').adapter.remoteJoin(userSocketID, data.roomId, (err) => {
                            if (err) { /* unknown id */ }
                            // success
                            GLOBALCONSTANTS.LOGGER.LOG('verbose', 'user : ' + user + ' with socket id : ' + userSocketID + ' connected to room ' + data.roomId);
                        });
                    });

                });
                chatObject = {
                    chatId: data.roomId,
                    roomId: data.roomId,
                    users: data.users
                };
                let chatData = {};
                mongoDbService.getChat(data.roomId).then((data) => {
                    if (!data.length) {
                        mongoDbService.addChat(chatObject).then((response) => {
                            if (response) {
                                GLOBALCONSTANTS.LOGGER.LOG('verbose', 'chat added with id ' + chatObject.chatId);
                            }
                        }).catch((error) => {
                            GLOBALCONSTANTS.LOGGER.LOG('error', error);
                        });
                    } else {
                        chatData = data[0];
                        socket.emit('chatMsg', chatData);
                    }

                });
                onlineUserStorageService.getUser(data.origin_user).forEach((userSocketID) => {
                    socket.emit('chatInitServer', data);
                });
            }
        });
        socket.on('addUserToRoom', (data) => {
            data.users.forEach((user) => {
                onlineUserStorageService.getUser(user).forEach((userSocketID) => {
                    io.of('/').adapter.remoteJoin(userSocketID, data.roomId, (err) => {
                        if (err) { /* unknown id */ }
                        // success
                        GLOBALCONSTANTS.LOGGER.LOG('verbose', 'user : ' + user + ' with socket id : ' + userSocketID + ' connected to room ' + data.roomId);
                    });
                });

            });
        });
        socket.on('removeUserFromRoom', (data) => {
            data.users.forEach((user) => {
                onlineUserStorageService.getUser(user).forEach((userSocketID) => {
                    io.of('/').adapter.remoteLeave(userSocketID, data.roomId, (err) => {
                        if (err) { /* unknown id */ }
                        // success
                        GLOBALCONSTANTS.LOGGER.LOG('verbose', 'user : ' + user + ' with socket id : ' + userSocketID + ' removed from room ' + data.roomId);
                    });
                });

            });
        });
        socket.on('chatMsg', (data) => {
            onlineUserStorageService.getRoomUsers(data.roomId).forEach((user) => {
                onlineUserStorageService.getUser(user).forEach((userSocketID) => {
                    io.of('/').adapter.remoteJoin(userSocketID, data.roomId, (err) => {
                        if (err) { /* unknown id */ }
                        // success
                        GLOBALCONSTANTS.LOGGER.LOG('verbose', 'user : ' + user + ' with socket id : ' + userSocketID + ' connected to room ' + data.roomId);
                    });
                });

            });
            io.in(data.roomId).emit('chatMsg', data);
            mongoDbService.addMessages(data.roomId, data.messages);
        });
        socket.on('typing', (data) => {
            socket.to(data.roomId).emit('typing', data);
        });
        socket.on('disconnect', function() {
            onlineUserStorageService.removeUserFromRoomList(onlineUserStorageService.getUser(socket.id));
            onlineUserStorageService.removeUser(socket.id);
        });
    });
};

ioWrapper.generateRoomID = function(listOfIds) {
    if (!(listOfIds instanceof Array)) {
        listOfIds = [listOfIds];
    }
    return md5(listOfIds.sort().toString().split(',').join(''));
}

module.exports = ioWrapper;