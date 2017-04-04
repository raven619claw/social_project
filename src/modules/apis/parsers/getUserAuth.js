const getUserAuthModel = require('../../../models/users/getUserAuth.js');
const sessionService = require('../../../services/sessionService.js');
let getUserAuth = function(req, res) {
    let user={
        username:req.body.username,
        password:req.body.password
    }
    getUserAuthModel.getUserAuth(user)
        .then((result) => {
            if(result.loginStatus.password){
                sessionService.setSessionObject(req.session, {username:result.user.username , success: true})
            }
            res.end(JSON.stringify(result));
            },
            (error) => {
                res.end(JSON.stringify(false));
            });
};

module.exports = getUserAuth;
