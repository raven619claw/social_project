let moduleLoader = {};

import commonModules from './commonModules.js';

moduleLoader.startModules = (moduleList) => {
    let moduleName, moduleFn;
    moduleList.forEach((module) => {
        moduleName = module.name;
        moduleFn = module.fn;
        let moduleEl = $('body').find('[data-module="' + moduleName + '"]');
        if (moduleEl.length) {
            moduleEl.toArray().forEach((el) => {
                let config = moduleLoader.getConfig(el);
                moduleFn.init(el, config);
            });

        }
    });

};

moduleLoader.stopModules = (moduleList) => {
    let moduleName, moduleFn;
    moduleList.forEach((module) => {
        moduleName = module.name;
        moduleFn = module.fn;
        let moduleEl = $('body').find('[data-module="' + moduleName + '"]');
        if (moduleEl.length) {
            moduleEl.toArray().forEach((el) => {
                moduleFn.destroy(el);
            });

        }
    });

};

moduleLoader.getConfig = (el) => {
    if ($(el).find('script')) {
        return JSON.parse($(el).find('script').html().replace(/\s/g,''));
    }
    return {};
};

moduleLoader.init = () => {
    moduleLoader.startModules(commonModules);
};

moduleLoader.destroy = () => {
    moduleLoader.stopModules(commonModules);
};

module.exports = moduleLoader;
