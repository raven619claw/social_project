let uuidV1 = require('uuid/v1');

const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');

const createUserModel = require('../../../models/users/createUser.js');

let createUser = function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
    let user = {};
    user = {
        userId: uuidV1(),
        userType: req.body.userType,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password || null,
        firstName: req.body.firstName || null,
        lastName: req.body.lastName || null,
    }
    createUserModel.createUser(user)
        .then((result) => {
                res.status(200).json({ 'user': result.user, 'created': result.created });
            },
            (error) => {
                res.status(500).send(error)
            });
};

module.exports.setup = (router) => {
    router.route('/apis/createUser').all(createUser);
};
