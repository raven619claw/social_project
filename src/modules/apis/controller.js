var apiRouteHandler = (req, res) => {
    var parsers = require('./parsers.js')();
    switch (req.path) {
        case '/apis/users':
        	parsers.getUser(req, res);
        	break;
        case '/apis/createUser':
          parsers.createUser(req, res);
          break;
        case '/apis/userAuth':
          parsers.getUserAuth(req, res);
          break;
    	default:
    		res.end('bad request');
    		break;
    }
}


module.exports = apiRouteHandler;
