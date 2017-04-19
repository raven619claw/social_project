//node modules
const marko = require('marko');

let templateLoader = (template) => {
    template = marko.load(template);
    let layoutData = { title: 'social_project' };
    template.renderTemplate = (dataFn, req, res) => {
        dataFn(req, res).then((result) => {
        	console.log(result,'in loader')
            layoutData.data = result;
            template.render(layoutData, res);
        }).catch((error)=>{
        	console.log('error!!',error)
        });

    }
    return template;
};

module.exports = templateLoader
