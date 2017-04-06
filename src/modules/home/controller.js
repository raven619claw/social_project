const GLOBALCONSTANTS = require('../../config/constants');
const apiConfig = require('../../config/apiConfig');
const apiService = require('../../services/apiService');
const sessionGlobal = require(GLOBALCONSTANTS.ROOTPATH + '/services/sessionService');

let template = require.resolve('./index.marko');
let templateLoader = require(GLOBALCONSTANTS.ROOTPATH + '/services/templateLoader');
template = templateLoader(template);
//function to return any data required for the template
let loader = function(dataObject) {
    return dataObject;
}
let render = function(req, res) {
	GLOBALCONSTANTS.LOGGER.LOG('data', 'rendering home module for GET request');
	let userData = sessionGlobal.getUserDataFromSession(req.session);
    return template.renderTemplate(loader(userData), res);
};

module.exports.setup = (router) => {
	router.route('/').get(render);
};
