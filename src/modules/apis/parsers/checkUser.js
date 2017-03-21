const checkUserModel = require('../../../models/users/checkUser.js');

let checkUser = function(req, res) {
    let user = {};
    user = {
        username: req.query.username
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
