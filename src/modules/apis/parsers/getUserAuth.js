const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');

const getUserAuthModel = require('../../../models/users/getUserAuth.js');

let getUserAuth = function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
    let user={
        username:req.body.username,
        password:req.body.password
    }
    getUserAuthModel.getUserAuth(user)
        .then((result) => {
            if(result.loginStatus.password){
                sessionService.setSessionObject(req.session, {user:result.user , success: true})
            }
            res.status(200).json(result);
            },
            (error) => {
                res.status(500).send(error);
            });
};

module.exports.setup = (router) => {
    router.route('/apis/userAuth').all(getUserAuth);
};
