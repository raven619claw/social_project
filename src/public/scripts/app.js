import popupActions from './modules/helpers/scripts/popupActions.js';
import login from './login.js';
import signup from './signup.js';
import moduleLoader from './modules/helpers/scripts/moduleLoader.js';


let moduleList;
moduleList = [{}];

let init = () => {
    moduleLoader.init();
    moduleLoader.startModules(moduleList);
    popupActions.openMediaPopup('body');
};

init();
