import eventManager from './../../helpers/scripts/eventsManager.js';

let moduleObject = {};
// eventManager.addListener('dropdownChange', (value) => {
            // }, 'privacyDropDown');

let template = require('../views/template');
let bindEvents = (el) => {
    $(el).find('.js-select').on('change', function(event) {
        eventManager.dispatchEvent('dropdownChange', $(this).val());
    });
};
moduleObject.init = (el, config) => {
    console.log('dropdown module init');
    eventManager.dispatchEvent('dropDownInit');
    template.renderSync(config).replaceChildrenOf(el);
    bindEvents(el);
};

moduleObject.destroy = (el) => {
    $(el).off();
};
module.exports = moduleObject;
