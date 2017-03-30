const apiConfig = require('../../config/apiConfig');
const apiService = require('../../services/apiService');
const GLOBALCONSTANTS = require('../../config/constants');
let template = require.resolve('./index.marko');
let templateLoader = require(GLOBALCONSTANTS.ROOTPATH + '/services/templateLoader');
template = templateLoader(template);
//function to return any data required for the template
let loader = function(dataObject) {
    return dataObject;
}
let render = function(req, res, dataObject) {
    return template.renderTemplate(loader(dataObject), res);
};

module.exports = render;
