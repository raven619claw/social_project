const getUserModel = require('../../../models/users/getUser.js');

let getUser = function(req, res) {
	let users ={};
	if(req.query){
		users ={
			username: req.query.username
		}
	}
    getUserModel.getUser(users)
        .then((result) => {
        	res.end(JSON.stringify({'users':result}));
            },
            (error) => {
            	console.log(error);
            });
};

module.exports = getUser;
