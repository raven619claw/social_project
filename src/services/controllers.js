let glob = require('glob');
let path = require("path");
let rootPath = path.join(__dirname, '../');
module.exports = function() {
    let controllersPath = {};
    let controllers = glob.sync(rootPath + '/modules/**/controller.js');
    controllers.forEach((controller) => {
        let substr = controller.slice(0, controller.lastIndexOf("/"));
        controllersPath[(substr.slice(substr.lastIndexOf("/") + 1))] = require(controller);
    });
    return controllersPath;
};
