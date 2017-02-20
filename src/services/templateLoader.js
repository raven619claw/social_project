const marko = require('marko');

const templateLoader = (template)=>{
	template = marko.load(template);

	template.renderSync = (data,res)=>{
		template.render(data,res);
	}
	return template;
};

module.exports = templateLoader