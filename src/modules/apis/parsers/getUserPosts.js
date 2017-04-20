const getUserPostsModel = require('../../../models/users/getUserPosts.js');

let getUserPosts = function(req, res) {
	let users ={};
	if(req.query){
		user ={
			userid: req.query.userid
		}
	}
    getUserPostsModel.getUserPosts(user)
        .then((result) => {
        	res.status(200).send(JSON.stringify({'userPosts':result}));
            },
            (error) => {
            	res.status(500).send(error);
            });
};

module.exports = getUserPosts;
