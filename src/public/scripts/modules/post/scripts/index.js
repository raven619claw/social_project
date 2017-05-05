import ajaxHelper from '../../helpers/scripts/ajaxHelper.js';
import Utils from '../../helpers/scripts/utils.js';

(() => {
    let SELECTORS = {
        'PARENT': '.js-postParent',
        'INPUT': '.js-postMsg',
        'SUBMIT': '.js-submitPost',
        'ERROR': '.js-error',
        'USERID': 'header'
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
                "dateCreated": (new Date).toDateString(),
                "content": $(SELECTORS.PARENT).find(SELECTORS.INPUT).val(),
                "media": [],
                "privacyFlag": 2,
                "medium": "desktop"
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
