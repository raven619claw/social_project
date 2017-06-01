import ajaxHelper from '../../helpers/scripts/ajaxHelper.js';
import Utils from '../../helpers/scripts/utils.js';

(() => {
    let SELECTORS = {
        'PARENT': '.js-postParent',
        'INPUT': '.js-postMsg',
        'SUBMIT': '.js-submitPost',
        'ERROR': '.js-error',
        'USERID': 'header',
        'PRIVACY': '.js-select'
    };

    bindEvents();

    function bindEvents() {
        $(SELECTORS.PARENT).find(SELECTORS.SUBMIT).on('click', submitPost);
    };

    function submitPost() {
        if ($(SELECTORS.PARENT).find(SELECTORS.INPUT).val()) {
            $(SELECTORS.PARENT).find(SELECTORS.ERROR).addClass('hide');
            let formData = {
                "userId": $(SELECTORS.USERID).data('userid'),
                "dateCreated": (new Date).getTime(),
                "content": $(SELECTORS.PARENT).find(SELECTORS.INPUT).val(),
                "media": [],
                "privacyFlag": $(SELECTORS.PARENT).find(SELECTORS.PRIVACY).val(),
                "medium": Utils.isMobile() ? 'mobile' : 'desktop'
            };
            let url = '/apis/createPost';
            ajaxHelper.PUT(url, formData).then((response) => {
                console.log(response);
                window.location = Utils.CURRENT_URL;
            }).catch((error) => {
                console.log(error);
            });
        } else {
            $(SELECTORS.PARENT).find(SELECTORS.ERROR).removeClass('hide');
        }
    };
})();
