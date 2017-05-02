const getHomePostsModel = require('../../../models/users/getHomePosts.js');

let getHomePosts = function(req, res) {
	let users ={};
	if(req.query){
		user ={
			userid: req.query.userid
		}
	}
    getHomePostsModel.getHomePosts(user)
        .then((result) => {
        	res.status(200).send(JSON.stringify({'posts':result}));
            },
            (error) => {
            	res.status(500).send(error);
            });
};

module.exports = getHomePosts;
