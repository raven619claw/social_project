const GLOBALCONSTANTS = require('../../config/constants');
const apiConfig = require('../../config/apiConfig');
const apiService = require('../../services/apiService');
const sessionGlobal = require(GLOBALCONSTANTS.ROOTPATH + '/services/sessionService');

let template = require.resolve('./index.marko');
let templateLoader = require(GLOBALCONSTANTS.ROOTPATH + '/services/templateLoader');

let render = function(req, res) {
    if (req.params.entity == 'favicon.ico')
        return;
    template = templateLoader(template);
    GLOBALCONSTANTS.LOGGER.LOG('data', 'rendering profile module for GET request');

    return template.renderTemplate(loader, req, res);
};

module.exports.setup = (router) => {
    router.route('/:entity').get(render);
};

//function to return any data required for the template
let loader = async function(req, res) {
    let pageData = {};
    pageData.userData = {};
    pageData.userData.user = {};
    let userData = sessionGlobal.getUserDataFromSession(req.session) || {};
    pageData.userData = userData;
    let result = await getUserDetails(req.params.entity);
    pageData.userData.user = pageData.userData.user || {};
    if (req.params.entity == pageData.userData.user.username) {
        pageData.userData.currentUser = true;
        pageData.userData.viewedUser = result.data.users[0];
    } else {
        pageData.userData.viewedUser = result.data.users[0];
    }
    // pageData.userData.user.userId = pageData.userData.user.userId || result.data.users[0].userId;
    pageData.userData.user.username = pageData.userData.user.username || result.data.users[0].username;    
    result = await getPostData(result.data.users[0].userId);
    pageData.userPostData = [];
    result.data.userPosts.forEach((post) => {
        pageData.userPostData.push(post)
    });
    return pageData;
};

let getUserDetails = (username) => {
    return apiService.get(apiConfig.getUser(username).url)
};

let getPostData = (userID) => {
    return apiService.get(apiConfig.getUserPost(userID).url)
};
