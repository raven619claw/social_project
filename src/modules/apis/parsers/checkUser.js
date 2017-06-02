const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');
const checkUserModel = require('../../../models/users/checkUser.js');

let checkUser = function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
    let user = {
        username: null,
        email: null
    };
    if (req.query.username) {
        user.username = req.query.username;
    }
    if (req.query.email) {
        user.email = req.query.email;
    }
    checkUserModel.checkUser(user)
        .then((result) => {
                res.status(200).json({ 'user': result });
            },
            (error) => {
                res.status(500).send(error);
            });
};

module.exports.setup = (router) => {
    router.route('/apis/checkUser').all(checkUser);
};
