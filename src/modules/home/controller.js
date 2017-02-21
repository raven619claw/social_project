const GLOBALCONSTANTS = require('../../config/constants');
const marko = require('marko');
let templateLoader = require(GLOBALCONSTANTS.ROOTPATH + '/services/templateLoader');

//function to return any data required for the template
let loader = function(req) {
    return {
    	name:'ravi',
    	location:'gurgaon'
    };
}
let render = function(req, res) {
	let template = templateLoader(__dirname);
    return template.renderTemplate(loader(req), res);
};

module.exports = render;
