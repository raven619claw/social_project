const sessionService = require('../../services/sessionService.js');

var apiRouteHandler = (req, res) => {
    var parsers = require('./parsers.js')();
    switch (req.path) {
        case '/apis/users':
            parsers.getUser(req, res);
            break;
        case '/apis/checkUser':
            parsers.checkUser(req, res);
            break;
        case '/apis/userSocialAuth':
        case '/apis/createUser':
            parsers.createUser(req, res);
            break;
        case '/apis/userAuth':
            parsers.getUserAuth(req, res);
            break;
        case '/apis/user/logout':
            req.session = sessionService.setSessionObject(req.session, { username: false, success: false });
            res.end(JSON.stringify({ statusCode: '2XX', loginStatus: false }));
            break;
        default:
            res.end('bad request');
            break;
    }
}


module.exports = apiRouteHandler;
