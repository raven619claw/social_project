const GLOBALCONSTANTS = require('../config/constants');
const onlineUserStorageService = require('./onlineUserStorageService');
let ioWrapper = {};

ioWrapper.setup = (app, socketModule) => {
    let io = socketModule(app);
    io.on('connection', (socket) => {
        GLOBALCONSTANTS.LOGGER.LOG('verbose', 'socket connection made ' + socket.id);
        if (socket.handshake.query.userid)
            onlineUserStorageService.addUser(socket.handshake.query.userid, socket.id);
        socket.on('chatMsg', (data) => {
            io.to(onlineUserStorageService.getUser(data.source_userid)).emit('chatMsg', data);
            io.to(onlineUserStorageService.getUser(data.destination_userid)).emit('chatMsg', data);
        });
        socket.on('typing', (data) => {
            socket.to(onlineUserStorageService.getUser(data.destination_userid)).emit("typing", data);
        });
    });
};

module.exports = ioWrapper;
