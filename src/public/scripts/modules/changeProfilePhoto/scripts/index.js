import ajaxHelper from '../../helpers/scripts/ajaxHelper.js';
let SELECTORS = {
    'PARENT': '.js-profilePhoto',
    'REMOVE': '.js-removePhoto',
    'CHANGE': '.js-changePhoto',
    'ERROR': '.js-error',
    'MEDIA_EL': '.js-media',
    'USERID': 'header',
    'MEDIA_DEST': '.js-profilePhotoEl'
};

let updatedURL = '';
bindEvents();

function bindEvents() {
    $(SELECTORS.PARENT).find(SELECTORS.REMOVE).on('click', removeProfilePhoto);
    $(SELECTORS.PARENT).find(SELECTORS.MEDIA_EL).on('change', changeProfilePhoto);
};

function removeProfilePhoto() {
    let formData = {
        "userid": $(SELECTORS.USERID).data('userid'),
    };
    let url = '/apis/removeProfilePhoto';
    ajaxHelper.PUT(url, formData).then((response) => {
        $(SELECTORS.PARENT).find(SELECTORS.MEDIA_DEST).attr('src', '');
    }).catch((error) => {
        console.log(error);
    });
};

function changeProfilePhoto() {

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
            updatedURL = file.URL;
            let formData = {
                "userid": $(SELECTORS.USERID).data('userid'),
                "mediaid": file.id
            };
            let url = '/apis/updateProfilePhoto';
            ajaxHelper.PUT(url, formData).then((response) => {
                $(SELECTORS.PARENT).find(SELECTORS.MEDIA_DEST).attr('src', updatedURL);
            }).catch((error) => {
                console.log(error);
            });
        });
    }).catch((error) => {
        console.log(error);
    });

};
