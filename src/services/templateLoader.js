const marko = require('marko');

let templateLoader = (template)=>{
	template = marko.load(template);
	let layoutData = {title:'social_project'};
	template.renderTemplate = (data,res)=>{
		layoutData.data = data;
		template.render(layoutData,res);
	}
	return template;
};

module.exports = templateLoader