const GLOBALCONSTANTS = require('../../config/constants');
const sessionService = require('../../services/sessionService.js');


module.exports.setup = (router) => {
    var parsers = require('./parsers.js')();
    Object.keys(parsers).forEach((parser)=>{
        parsers[parser].setup(router);
    });
};
