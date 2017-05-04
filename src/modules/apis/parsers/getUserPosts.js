const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');

const getUserPostsModel = require('../../../models/users/getUserPosts.js');

let getUserPosts = function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
	let users ={};
	if(req.query){
		user ={
			userid: req.query.userid
		}
	}
    getUserPostsModel.getUserPosts(user)
        .then((result) => {
            res.status(200).json({'userPosts':result});

            },
            (error) => {
            	res.status(500).send(error);
            });
};

module.exports.setup = (router) => {
    router.route('/apis/getUserPosts').all(getUserPosts);
};
