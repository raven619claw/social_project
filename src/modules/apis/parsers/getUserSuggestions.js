const getUserSuggestionsModel = require('../../../models/interaction/getUserSuggestions.js');

let getUserSuggestions = function(req, res) {
    let postData = {
        userFrom: req.body.userFrom
    };
    getUserSuggestionsModel.getUserSuggestions(postData)
        .then((result) => {
                res.status(200).json({ 'users': result });
            },
            (error) => {
                res.status(500).send(error);
            });
};

module.exports = getUserSuggestions;
