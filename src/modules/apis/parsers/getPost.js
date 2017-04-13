let uuidV1 = require('uuid/v1');

const getPostModel = require('../../../models/post/getPost.js');

let getPost = function(req, res) {
    let postID = req.query.postid;
    getPostModel.getPost(postID)
        .then((result) => {
                res.end(JSON.stringify({ 'post': result }));
            },
            (error) => {
                console.log(error);
            });
};

module.exports = getPost;
