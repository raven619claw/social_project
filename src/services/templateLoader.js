//node modules
const marko = require('marko');

let templateLoader = (template) => {
    template = marko.load(template);
    let layoutData = { title: 'social_project' };
    template.renderTemplate = async(dataFn, req, res) => {
        try {
            // this parse may fail
            let result = await dataFn(req, res);
            layoutData.data = result;
            template.render(layoutData, res);
        } catch (err) {
            console.log(err)
        }
    };
    return template;
};

module.exports = templateLoader
