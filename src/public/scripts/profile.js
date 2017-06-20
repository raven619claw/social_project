require('./modules/post/scripts/index');
require('./modules/changeProfilePhoto/scripts/index');
require('./modules/userInteractions/scripts/index');

import moduleLoader from './modules/helpers/scripts/moduleLoader.js';


let moduleList;
moduleList = [{}];

let init = () => {
    moduleLoader.init();
    moduleLoader.startModules(moduleList);
};

init();
