const GLOBALCONSTANTS = require('../../../config/constants');
const sessionService = require('../../../services/sessionService.js');

const getUserSuggestionsModel = require('../../../models/interaction/getUserSuggestions.js');

let getUserSuggestions = function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
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

module.exports.setup = (router) => {
    router.route('/apis/getUserSuggestions').all(getUserSuggestions);
};
