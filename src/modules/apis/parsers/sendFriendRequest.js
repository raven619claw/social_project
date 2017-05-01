const sendFriendRequestModel = require('../../../models/interaction/sendFriendRequest.js');

let sendFriendRequest = function(req, res) {
    let postData = {
        userFrom: req.body.userFrom,
        userTo: req.body.userTo
    };
    sendFriendRequestModel.sendFriendRequest(postData)
        .then((result) => {
                res.status(200).json({ 'data': result });
            },
            (error) => {
                res.status(500).send(error);
            });
};

module.exports = sendFriendRequest;
