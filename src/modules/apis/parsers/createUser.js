let uuidV1 = require('uuid/v1');

const createUserModel = require('../../../models/users/createUser.js');

let createUser = function(req, res) {
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
                res.status(200).send(JSON.stringify({ 'user': result.user, 'created': result.created }));
            },
            (error) => {
                res.status(500).send(error)
            });
};

module.exports = createUser;
