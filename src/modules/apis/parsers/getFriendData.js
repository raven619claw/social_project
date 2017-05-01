const getFriendDataModel = require('../../../models/users/getFriendData.js');

let getFriendData = function(req, res) {
    let postData = {
        userFrom: req.body.userFrom,
        userTo: req.body.userTo || '',
        status: req.body.status || '',
    };
    getFriendDataModel.getFriendData(postData)
        .then((result) => {
                res.status(200).json({ 'users': result });
            },
            (error) => {
                res.status(500).send(error);
            });
};

module.exports = getFriendData;
