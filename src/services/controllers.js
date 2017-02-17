var glob = require('glob');
var path = require("path");
var rootPath = path.join(__dirname, '../');
module.exports = function() {
    var controllersPath = {};
    var controllers = glob.sync(rootPath + '/modules/**/controller.js');
    console.log(controllers);
    for (var i = 0; i < controllers.length; i++) {
    	var substr = controllers[i].slice(0,controllers[i].lastIndexOf("/"));
        controllersPath[(substr.slice(substr.lastIndexOf("/") + 1))] = require(controllers[i]);
    }
    return controllersPath;
};
