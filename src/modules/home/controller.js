const GLOBALCONSTANTS = require('../../config/constants');
const apiConfig = require('../../config/apiConfig');
const apiService = require('../../services/apiService');
const sessionGlobal = require(GLOBALCONSTANTS.ROOTPATH + '/services/sessionService');

let template = require.resolve('./index.marko');
let templateLoader = require(GLOBALCONSTANTS.ROOTPATH + '/services/templateLoader');
//function to return any data required for the template
let loader = function(req, res) {
    return new Promise((resolve, reject) => {
        pageData = {};
        let userData = sessionGlobal.getUserDataFromSession(req.session);
        pageData.userData = userData;
        if (userData.success) {
            getPostData(userData.user.userId).then((result) => {
                pageData.userPostData = result.data;
                getUserSuggestions(userData.user.userId).then((result) => {
                    pageData.userSuggestionsData = result.data;
                    getFriendData(userData.user.userId, null, 'pending').then((result) => {
                        pageData.pendingRequests = result.data;
                        resolve(pageData);
                    }).catch((error) => {
                        GLOBALCONSTANTS.LOGGER.LOG('error', error);
                    });
                }).catch((error) => {
                    GLOBALCONSTANTS.LOGGER.LOG('error', error);
                });

            }).catch((error) => {
                GLOBALCONSTANTS.LOGGER.LOG('error', error);
            });
        } else {
            resolve(pageData);
        }
    });

}
let render = function(req, res) {
    template = templateLoader(template);
    GLOBALCONSTANTS.LOGGER.LOG('data', 'rendering home module for GET request');

    return template.renderTemplate(loader, req, res);
};

module.exports.setup = (router) => {
    router.route('/').get(render);
};

let getPostData = (userID) => {
    return apiService.get(apiConfig.getUserPost(userID).url)
};
let getUserSuggestions = (userID) => {
    return apiService.post(apiConfig.getUserSuggestions().url, {
        userFrom: userID
    })
};

let getFriendData = (userFrom, userTo, status) => {
    userTo = userTo || '';
    status = status || '';
    return apiService.post(apiConfig.getFriendData().url, {
        userFrom,
        userTo,
        status
    })
};
