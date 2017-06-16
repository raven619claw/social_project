import popupObject from '../../popup/scripts/index';
let actions = {};
const popupMediaModule = require('../../../../templates/popUpMediaViewer/template.marko');

actions.openMediaPopup = (pageEl) => {
    let SELECTORS = {
        POPUP_BTN: '.js-openMediaImg'
    }
    let showPopup = function() {
        let url = $(this).data('url');
        popupObject.openPopup(null, popupMediaModule, { 'URL': url });
    };
    $(pageEl).find(SELECTORS.POPUP_BTN).on('click', showPopup);

};
module.exports = actions;
