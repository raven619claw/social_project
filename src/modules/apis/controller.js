const GLOBALCONSTANTS = require('../../config/constants');
const sessionService = require('../../services/sessionService.js');

var apiRouteHandler = (req, res) => {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
    var parsers = require('./parsers.js')();
    switch (req.path) {
        case '/apis/users':
            parsers.getUser(req, res);
            break;
        case '/apis/checkUser':
            parsers.checkUser(req, res);
            break;
        case '/apis/createUser':
            parsers.createUser(req, res);
            break;
        case '/apis/userSocialAuth':
            parsers.userSocialAuth(req, res);
            break;
        case '/apis/userAuth':
            parsers.getUserAuth(req, res);
            break;
        case '/apis/createPost':
            parsers.createPost(req, res);
            break;
        case '/apis/getPost':
            parsers.getPost(req, res);
            break;
        case '/apis/getUserPosts':
            parsers.getUserPosts(req, res);
            break;
        case '/apis/user/logout':
            req.session = sessionService.setSessionObject(req.session, { username: false, success: false });
            res.status(200).send(JSON.stringify({ statusCode: '2XX', loginStatus: false }));
            break;
        default:
            res.status(400).send('bad request');
            break;
    }
}

module.exports.setup = (router)=>{
    router.all('/apis*',apiRouteHandler);
};
