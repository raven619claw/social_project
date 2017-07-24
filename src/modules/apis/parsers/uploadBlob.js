const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');


const awsBlobUpload = require('../../../services/helpers/awsBlobUpload.js');

const updateBlobModel = require('../../../models/users/updateBlob.js');

let uploadBlob = (req, res) => {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
    let postData = {
        userid: req.body.userid,
        media: []
    };
    req.files.forEach((file) => {
        let result = {
            fileName: file.key,
            URL: file.location,
            metadata: file.metadata
        };
        postData.media.push(file.location.substring(file.location.lastIndexOf('/') + 1));
    });
    
    updateBlobModel.updateBlob(postData)
        .then((result) => {

            },
            (error) => {

            });

    let resultObj = [];

    req.files.forEach((file) => {
        let result = {
            fileName: file.key,
            URL: file.location,
            metadata: file.metadata,
            id:(file.location.substring(file.location.lastIndexOf('/') + 1)).split('_')[0]
        };
        resultObj.push(result);
    });
    res.status(200).json({
        'data': {
            'statement': 'files successfully uploaded',
            files: resultObj
        }
    });
};


module.exports.setup = (router) => {
    router.route('/apis/uploadBlob').all(awsBlobUpload.any(), uploadBlob);
};
