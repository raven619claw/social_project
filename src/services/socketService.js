const GLOBALCONSTANTS = require('../config/constants');

let ioWrapper = {};

ioWrapper.setup = (app, socketModule) => {
    let io = socketModule(app);
    io.on('connection', (socket) => {
        GLOBALCONSTANTS.LOGGER.LOG('verbose', 'socket connection made ' + socket.id);
        socket.on('chatMsg', (data) => {
            io.sockets.emit('chatMsg', data);
        });
        socket.on('typing', (data) => {
            socket.broadcast.emit("typing", data);
        });
    });
};

module.exports = ioWrapper;
