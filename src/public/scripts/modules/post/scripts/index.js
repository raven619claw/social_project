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
        'MEDIA_WRAP': '.js-mediaWrap'
    };
    let mediaURL=[];

    bindEvents();

    function bindEvents() {
        $(SELECTORS.PARENT).find(SELECTORS.SUBMIT).on('click', submitPost);
        $(SELECTORS.PARENT).find(SELECTORS.MEDIA).on('click', function() {
            this.val = null;
        });
        $(SELECTORS.PARENT).find(SELECTORS.MEDIA).on('change', uploadMedia);
    };

    function uploadMedia() {
        let formData = new FormData();
        formData.append('file',$(this).prop('files')[0]);
        let options = {
            headers: {
                'Content-Type': undefined
            }
        };
        let url = '/apis/uploadBlob';
        ajaxHelper.POST(url, formData, options).then((response) => {
            let mediaFiles = response.data.data.files;
            mediaFiles.forEach((file)=>{
                $(SELECTORS.PARENT).find(SELECTORS.MEDIA_WRAP).append('<img class="postMedia" src="'+file.URL+'">');
                mediaURL.push(file.URL); 
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
