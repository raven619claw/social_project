const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');

const updateProfilePhotoModel = require('../../../models/users/updateProfilePhoto.js');

let updateProfilePhoto = function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
    let postData = {
        userid: req.body.userid,
        mediaid: req.body.mediaid
    };
    updateProfilePhotoModel.updateProfilePhoto(postData)
        .then((result) => {
                res.status(200).json({ 'data': result });
            },
            (error) => {
                res.status(500).send(error);
            });
};

module.exports.setup = (router) => {
    router.route('/apis/updateProfilePhoto').all(updateProfilePhoto);
};
