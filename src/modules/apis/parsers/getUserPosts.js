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
        	res.end(JSON.stringify({'userPosts':result}));
            },
            (error) => {
            	console.log(error);
            });
};

module.exports = getUserPosts;
