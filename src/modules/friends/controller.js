require('marko/node-require');

const GLOBALCONSTANTS = require('../../config/constants');
const apiConfig = require('../../config/apiConfig');
const apiService = require('../../services/apiService');
const sessionGlobal = require(GLOBALCONSTANTS.ROOTPATH + '/services/sessionService');

let template = require('./index.marko');
let templateLoader = require(GLOBALCONSTANTS.ROOTPATH + '/services/templateLoader');

let render = function(req, res) {
    template = templateLoader(template);
    GLOBALCONSTANTS.LOGGER.LOG('data', 'rendering friends module for GET request');

    return template.renderTemplate(loader, req, res);
};

module.exports.setup = (router) => {
    router.route('/:entity/friends').get(render);
};

//function to return any data required for the template
let loader = function(req, res) {
    return new Promise((resolve, reject) => {
        let pageData = {};
        pageData.userData = {};
        pageData.userData.user = {};
        let userData = sessionGlobal.getUserDataFromSession(req.session) || {};
        pageData.userData = userData;
        getUserDetails(req.params.entity).then((result) => {
            pageData.userData.user = pageData.userData.user || {};
            if(req.params.entity == pageData.userData.user.username){
                pageData.userData.currentUser = true;
                pageData.userData.viewedUser = result.data.users[0];
            }else{
                pageData.userData.viewedUser = result.data.users[0];
            }
            pageData.userData.user.userId = pageData.userData.user.userId || result.data.users[0].userId;
            getFriendData(result.data.users[0].userId, null, 'accepted').then((result) => {
                pageData.friends = result.data;
                resolve(pageData);
            }).catch((error) => {
                GLOBALCONSTANTS.LOGGER.LOG('error', error);
            });
        }).catch((error) => {
            GLOBALCONSTANTS.LOGGER.LOG('error', error);
        });
    });
};

let getUserDetails = (username) => {
    return apiService.get(apiConfig.getUser(username).url)
};

let getFriendData = (userFrom, userTo, status) => {
    userFrom = userFrom || '';
    userTo = userTo || '';
    status = status || '';
    return apiService.post(apiConfig.getFriendData().url, {
        userFrom,
        userTo,
        status
    })
};
