const glob = require('glob');
const globalConstants = require('../config/constants.js');

module.exports = function() {
    let controllersPath = {};
    let controllers = glob.sync(globalConstants.rootPath + '/modules/**/controller.js');
    controllers.forEach((controller) => {
        let substr = controller.slice(0, controller.lastIndexOf("/"));
        controllersPath[(substr.slice(substr.lastIndexOf("/") + 1))] = require(controller);
    });
    return controllersPath;
};
