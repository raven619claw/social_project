const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');

const removeProfilePhotoModel = require('../../../models/users/removeProfilePhoto.js');

let removeProfilePhoto = function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
    let postData = {
        userid: req.body.userid,
    };
    removeProfilePhotoModel.removeProfilePhoto(postData)
        .then((result) => {
                res.status(200).json({ 'data': result });
            },
            (error) => {
                res.status(500).send(error);
            });
};

module.exports.setup = (router) => {
    router.route('/apis/removeProfilePhoto').all(removeProfilePhoto);
};
