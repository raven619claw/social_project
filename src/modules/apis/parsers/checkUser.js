const checkUserModel = require('../../../models/users/checkUser.js');

let checkUser = function(req, res) {
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
                res.status(200).send(JSON.stringify({ 'user': result }));
            },
            (error) => {
                res.status(500).send(error);
            });
};

module.exports = checkUser;
