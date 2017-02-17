var glob = require('glob');
var path = require("path");
var rootPath = path.join(__dirname, '../');
module.exports = function() {
    var controllersPath = {};
    var controllers = glob.sync(rootPath + '/modules/**/*[!marko].js');
    for (var i = 0; i < controllers.length; i++) {
    	var substr = controllers[i].slice(0,controllers[i].lastIndexOf("/") + 1);

        controllersPath[(controllers[i].slice(substr.lastIndexOf("/") + 1, -3))] = require(controllers[i]);
    }
    return controllersPath;
};
