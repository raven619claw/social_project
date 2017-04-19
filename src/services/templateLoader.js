//node modules
const marko = require('marko');

let templateLoader = (template) => {
    template = marko.load(template);
    let layoutData = { title: 'social_project' };
    template.renderTemplate = (dataFn, req, res) => {
        dataFn(req, res).then((result) => {
        	console.log(result)
            layoutData.data = result;
            template.render(layoutData, res);
        });

    }
    return template;
};

module.exports = templateLoader
