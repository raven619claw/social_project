const globalConstants = require('../../config/constants');

const templateLoader = require(globalConstants.rootPath+'/services/templateLoader');
let template = require.resolve('./index.marko');
template = templateLoader(template);

//function to return any data required for the template
let loader = function(req) {
    return {};
}
let render = function(req, res) {
    return template.renderSync(loader(req), res);
};

module.exports = render;
