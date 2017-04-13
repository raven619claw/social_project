let uuidV1 = require('uuid/v1');

const createPostModel = require('../../../models/post/createPost.js');

let createPost = function(req, res) {
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
                res.end(JSON.stringify({ 'postID': result }));
            },
            (error) => {
                console.log(error);
            });
};

module.exports = createPost;
