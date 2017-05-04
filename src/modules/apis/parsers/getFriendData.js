const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');

const getFriendDataModel = require('../../../models/users/getFriendData.js');

let getFriendData = function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
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

module.exports.setup = (router) => {
    router.route('/apis/getFriendData').all(getFriendData);
};
