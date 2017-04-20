let uuidV1 = require('uuid/v1');

const getPostModel = require('../../../models/post/getPost.js');

let getPost = function(req, res) {
    let postID = req.query.postid;
    getPostModel.getPost(postID)
        .then((result) => {
                res.status(200).send(JSON.stringify({ 'post': result }));
            },
            (error) => {
                res.status(500).send(error);
            });
};

module.exports = getPost;
