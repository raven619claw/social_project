const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');

const getHomePostsModel = require('../../../models/users/getHomePosts.js');

let getHomePosts = function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
	let users ={};
	if(req.query){
		user ={
			userid: req.query.userid
		}
	}
    getHomePostsModel.getHomePosts(user)
        .then((result) => {
            res.status(200).json({ 'posts': result });
            },
            (error) => {
            	res.status(500).send(error);
            });
};

module.exports.setup = (router) => {
    router.route('/apis/getHomePosts').all(getHomePosts);
};
