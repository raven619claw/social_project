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
                res.end(JSON.stringify({ 'user': result }));
            },
            (error) => {
                console.log(error);
            });
};

module.exports = checkUser;
