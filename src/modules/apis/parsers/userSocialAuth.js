const socialLogin = require('../../../services/helpers/googleAuth.js');
const sessionService = require('../../../services/sessionService.js');
const GLOBALCONSTANTS = require('../../../config/constants');

const userSocialAuthModel = require('../../../models/users/userSocialAuth.js');


let userSocialAuth = function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
    let callUserModel = (token) => {
        user = {
            userId: token,
            userType: req.body.userType,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password || null,
            firstName: req.body.firstName || null,
            lastName: req.body.lastName || null,
        }
        userSocialAuthModel.socialAuth(user)
            .then((result) => {
                    sessionService.setSessionObject(req.session, { user: result.user, success: true })
                    res.status(200).json({ 'user': result.user, 'created': result.created });
                },
                (error) => {
                    res.status(500).send(error);
                });
    };
    let user = {};
    if (req.method.toString() == 'PUT') {

        socialLogin.verifyGoogleUser(req.body.token, callUserModel);

    } else {
        res.status(400).send('bad request');
    }
};

module.exports.setup = (router) => {
    router.route('/apis/userSocialAuth').all(userSocialAuth);
};
