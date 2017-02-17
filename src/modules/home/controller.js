var marko = require('marko');
var template = require.resolve('./index.marko');

var loader = function() {
    return {};
}
var render = function(req, res) {
    template = marko.load(template);
    return template.render(loader(), res);
};

module.exports = render;
