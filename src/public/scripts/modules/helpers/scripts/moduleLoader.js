let moduleLoader = {};

import commonModules from './commonModules.js';
import Utils from './utils.js';

moduleLoader.startModules = (moduleList) => {
    let moduleName, moduleFn;
    moduleList.forEach((module) => {
        moduleName = module.name;
        moduleFn = module.fn;
        let moduleEl = $('body').find('[data-module="' + moduleName + '"]');
        if (moduleEl.length) {
            moduleEl.toArray().forEach((el) => {
                let config = Utils.getConfig(el);
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

moduleLoader.init = () => {
    moduleLoader.startModules(commonModules);
};

moduleLoader.destroy = () => {
    moduleLoader.stopModules(commonModules);
};

module.exports = moduleLoader;
