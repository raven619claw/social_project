var marko = require('marko');
var template = require.resolve('./index.marko');
template = marko.load(template);
var loader = function(){
	return {};
}
var render = function(req,res) {
    return template.render(loader(), res);
};

module.exports = render;
