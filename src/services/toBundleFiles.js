//node modules
const glob = require('glob');
//built in globals
const GLOBALCONSTANTS = require('../config/constants');

module.exports = function() {
    let parsersPath = {};
    let parsers = glob.sync(GLOBALCONSTANTS.ROOTPATH + '/public/scripts/*.js');
    parsers.forEach((parser) => {
        parsersPath[parser.slice((parser.lastIndexOf("/") + 1), -3)] = "./" + parser.slice((parser.lastIndexOf("src")));
    });
    return parsersPath;
};
