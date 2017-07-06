const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');
const onlineUserStorageService = require('../../../services/onlineUserStorageService.js');

let logout = function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
    onlineUserStorageService.removeUser(sessionService.getUserDataFromSession(req.session).user.userId);
    req.session = sessionService.setSessionObject(req.session, { username: false, success: false });
    res.status(200).send(JSON.stringify({ statusCode: '2XX', loginStatus: false }));
};

module.exports.setup = (router) => {
    router.route('/apis/user/logout').all(logout);
};
