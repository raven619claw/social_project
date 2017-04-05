const createUserModel = require('../../../models/users/createUser.js');

let createUser = function(req, res) {
    let user = {};
    user = {
        userId: req.body.email,
        userType: req.body.userType,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password || null,
        firstName: req.body.firstName || null,
        lastName: req.body.lastName || null,
    }
    createUserModel.createUser(user)
        .then((result) => {


                res.end(JSON.stringify({ 'user': result.user, 'created': result.created }));
            },
            (error) => {
                console.log(error);
            });
};

module.exports = createUser;
