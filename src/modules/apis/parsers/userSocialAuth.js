const userSocialAuthModel = require('../../../models/users/userSocialAuth.js');
const socialLogin = require('../../../services/helpers/googleAuth.js');
const sessionService = require('../../../services/sessionService.js');

let userSocialAuth = function(req, res) {
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
                    res.end(JSON.stringify({ 'user': result.user, 'created': result.created }));
                },
                (error) => {
                    console.log(error);
                });
    };
    let user = {};
    if (req.method.toString() == 'PUT') {

        socialLogin.verifyGoogleUser(req.body.token, callUserModel);

    } else {
        res.end('bad request');
    }
};

module.exports = userSocialAuth;
