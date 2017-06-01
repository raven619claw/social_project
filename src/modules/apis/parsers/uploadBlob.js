const awsBlobUpload = require('../../../services/helpers/awsBlobUpload.js');

let uploadBlob = (req, res) => {
    let resultObj = [];
    req.files.forEach((file) => {
        let result = {
            fileName: file.key,
            URL: file.location,
            metadata: file.metadata
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
