let uuidV1 = require('uuid/v1');

const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');

const getPostModel = require('../../../models/post/getPost.js');

let getPost = function(req, res) {
	GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
    let postID = req.query.postid;
    getPostModel.getPost(postID)
        .then((result) => {
                res.status(200).json({ 'post': result });
            },
            (error) => {
                res.status(500).send(error);
            });
};

module.exports.setup = (router) => {
    router.route('/apis/getPost').all(getPost);
};
