var apiRouteHandler = (req, res) => {
    var parsers = require('./parsers.js')();
    switch (req.path) {
        case '/apis/users':
        	parsers.getUser(req, res);
        	break;
    	default:
    		res.end('bad request');
    		break;
    }
}


module.exports = apiRouteHandler;
