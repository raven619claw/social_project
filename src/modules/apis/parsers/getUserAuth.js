const getUserAuthModel = require('../../../models/users/getUserAuth.js');

let getUserAuth = function(req, res) {
	let user={
		username:req.body.name,
		password:req.body.password
	}
    getUserAuthModel.getUserAuth(user)
        .then((result) => {
        	res.end(JSON.stringify({'user':result}));
            },
            (error) => {
            	res.end(JSON.stringify(false));
            });
};

module.exports = getUserAuth;
