const unFriendModel = require('../../../models/interaction/unFriend.js');

let unFriend = function(req, res) {
    let postData = {
        userFrom: req.body.userFrom,
        userTo: req.body.userTo
    };
    unFriendModel.unFriend(postData)
        .then((result) => {
                res.status(200).json({ 'data': result });
            },
            (error) => {
                res.status(500).send(error);
            });
};

module.exports = unFriend;
