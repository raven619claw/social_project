let uuidV1 = require('uuid/v1');

const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');
const createPostModel = require('../../../models/post/createPost.js');

let createPost = function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
    let mediaIds = [];
    let postData = {
        userId: req.body.userId,
        dateCreated: req.body.dateCreated,
        content: req.body.content,
        media: req.body.media || [],
        privacyFlag: req.body.privacyFlag,
        medium: req.body.medium,
        id: uuidV1()
    };
    createPostModel.createPost(postData)
        .then((result) => {
                res.status(200).json({ 'postID': result });
            },
            (error) => {
                res.status(500).send(error);
            });
};

module.exports.setup = (router) => {
    router.route('/apis/createPost').all(createPost);
};
