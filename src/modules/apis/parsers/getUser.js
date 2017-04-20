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
        	res.status(200).send(JSON.stringify({'users':result}));
            },
            (error) => {
            	res.status(500).send(error);
            });
};

module.exports = getUser;
