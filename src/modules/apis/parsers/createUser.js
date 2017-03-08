const createUserModel = require('../../../models/users/createUser.js');

let createUser = function(req, res) {
    let user = {}; 
    if (req.method.toString() == 'PUT') {
        user = {
            name: req.body.name,
            password: req.body.password
        }
        createUserModel.createUser(user)
            .then((result) => {
                    res.end(JSON.stringify({ 'user': result.user,'created':result.created }));
                },
                (error) => {
                    console.log(error);
                });
    }
    else{
        res.end('bad request');
    }

};

module.exports = createUser;
