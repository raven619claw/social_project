const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');

const acceptFriendRequestModel = require('../../../models/interaction/acceptFriendRequest.js');

let acceptFriendRequest = function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
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

module.exports.setup = (router) => {
    router.route('/apis/acceptFriendRequest').all(acceptFriendRequest);
};
