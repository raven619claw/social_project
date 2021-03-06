import ajaxHelper from '../../helpers/scripts/ajaxHelper.js';
import Utils from '../../helpers/scripts/utils.js';

(() => {
    let SELECTORS = {
        'PARENT': '.js-postParent',
        'INPUT': '.js-postMsg',
        'SUBMIT': '.js-submitPost',
        'ERROR': '.js-error',
        'USERID': 'header',
        'PRIVACY': '.js-select',
        'MEDIA': '.js-media',
        'MEDIA_WRAP': '.js-mediaWrap',
        'REMOVE_MEDIA': '.js-removeMedia'
    };
    let mediaURL = [];

    bindEvents();

    function bindEvents() {
        $(SELECTORS.PARENT).find(SELECTORS.SUBMIT).on('click', submitPost);
        $(SELECTORS.PARENT).find(SELECTORS.MEDIA).on('click', function() {
            this.val = null;
        });
        $(SELECTORS.PARENT).find(SELECTORS.MEDIA).on('change', uploadMedia);
        $(SELECTORS.PARENT).find(SELECTORS.MEDIA_WRAP).on('click', SELECTORS.REMOVE_MEDIA, removeMedia);
    };

    function removeMedia() {
        let URL = $(this).data('url');
        $(this).remove();
        let index = mediaURL.indexOf(splitFileName(URL));
        if (index > -1) {
            mediaURL.splice(index, 1);
        }
    };

    function splitFileName(URL) {
        return URL.substring(URL.lastIndexOf('/') + 1);
    };

    function uploadMedia() {
        let formData = new FormData();
        if (!$(this).prop('files').length) {
            return;
        }
        formData.append('file', $(this).prop('files')[0]);
        formData.append('userid', $(SELECTORS.USERID).data('userid'));
        let options = {
            headers: {
                'Content-Type': undefined
            }
        };
        let url = '/apis/uploadBlob';
        ajaxHelper.POST(url, formData, options).then((response) => {
            let mediaFiles = response.data.data.files;
            mediaFiles.forEach((file) => {
                $(SELECTORS.PARENT).find(SELECTORS.MEDIA_WRAP).append('<img data-url="' + file.URL + '" class="postMedia js-removeMedia" src="' + file.URL + '">');
                mediaURL.push(splitFileName(file.URL));
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    function submitPost() {
        if ($(SELECTORS.PARENT).find(SELECTORS.INPUT).val()) {
            $(SELECTORS.PARENT).find(SELECTORS.ERROR).addClass('hide');
            let formData = {
                "userId": $(SELECTORS.USERID).data('userid'),
                "dateCreated": (new Date).getTime(),
                "content": $(SELECTORS.PARENT).find(SELECTORS.INPUT).val(),
                "media": mediaURL,
                "privacyFlag": $(SELECTORS.PARENT).find(SELECTORS.PRIVACY).val(),
                "medium": Utils.isMobile() ? 'mobile' : 'desktop'
            };
            let url = '/apis/createPost';
            ajaxHelper.PUT(url, formData).then((response) => {
                window.location = Utils.CURRENT_URL;
            }).catch((error) => {
                console.log(error);
            });
        } else {
            $(SELECTORS.PARENT).find(SELECTORS.ERROR).removeClass('hide');
        }
    };
})();
