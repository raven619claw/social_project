import ajaxHelper from '../../helpers/scripts/ajaxHelper.js';
import Utils from '../../helpers/scripts/utils.js';

(() => {
    let SELECTORS = {
        'SENDREQUEST': '.js-sendRequest',
        'ACCEPTREQUEST': '.js-acceptRequest',
        'USERFROM': '.js-userDetails'
    };

    bindEvents();

    function bindEvents() {
        $(SELECTORS.SENDREQUEST).on('click', sendFriendRequest);
        $(SELECTORS.ACCEPTREQUEST).on('click', acceptFriendRequest);
    };

    function sendFriendRequest() {
        let formData = {
            "userFrom": $(SELECTORS.USERFROM).data('userid'),
            "userTo": $(this).data('userid'),
        };
        let url = '/apis/sendFriendRequest';
        ajaxHelper.POST(url, formData).then((response) => {
            if (response) {
                $(this).html('sent!');
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    function acceptFriendRequest() {
        let formData = {
            "userFrom": $(this).data('userid'),
            "userTo": $(SELECTORS.USERFROM).data('userid'),
        };
        let url = '/apis/acceptFriendRequest';
        ajaxHelper.POST(url, formData).then((response) => {
            if (response) {
                $(this).html('friends');
            }
        }).catch((error) => {
            console.log(error);
        });
    };
})();
