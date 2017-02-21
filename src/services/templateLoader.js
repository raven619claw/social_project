const marko = require('marko'),
path = require('path');

let templateLoader = (templatePath)=>{
	
	filePath = (templatePath + '/index.marko');
	template = marko.load(filePath);
	let layoutData = {title:'social_project'};
	template.renderTemplate = (data,res)=>{
		layoutData.data = data;
		template.render(layoutData,res);
	}
	return template;
};

module.exports = templateLoader