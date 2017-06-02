const getUserModel = require('../../../models/users/getUser.js');
const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');

let getUser = function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
	let users ={};
	if(req.query){
		users ={
			username: req.query.username
		}
	}
    getUserModel.getUser(users)
        .then((result) => {
        	res.status(200).json({'users':result});
            },
            (error) => {
            	res.status(500).send(error);
            });
};

module.exports.setup = (router) => {
    
    router.route('/apis/users').all(getUser);
};
