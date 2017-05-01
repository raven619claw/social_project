const acceptFriendRequestModel = require('../../../models/interaction/acceptFriendRequest.js');

let acceptFriendRequest = function(req, res) {
    let postData = {
        userFrom: req.body.userFrom,
        userTo: req.body.userTo
    };
    acceptFriendRequestModel.acceptFriendRequest(postData)
        .then((result) => {
                res.status(200).json({ 'data': result });
            },
            (error) => {
                res.status(500).send(error);
            });
};

module.exports = acceptFriendRequest;
