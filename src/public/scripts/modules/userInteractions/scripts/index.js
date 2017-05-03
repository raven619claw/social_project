import ajaxHelper from '../../helpers/scripts/ajaxHelper.js';
import Utils from '../../helpers/scripts/utils.js';

(() => {
    let SELECTORS = {
        'SENDREQUEST': '.js-sendRequest',
        'ACCEPTREQUEST': '.js-acceptRequest',
        'UNFRIEND': '.js-unfriend',
        'USERFROM': '.js-userDetails'
    };
    let CLASSNAMES = {
        'SENDREQUEST': 'js-sendRequest',
        'UNFRIEND': 'js-unfriend'
    }

    bindEvents();

    function bindEvents() {
        $(SELECTORS.SENDREQUEST).on('click', sendFriendRequest);
        $(SELECTORS.ACCEPTREQUEST).on('click', acceptFriendRequest);
        $(SELECTORS.UNFRIEND).on('click', unFriend);
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

    function unFriend() {
        let formData = {
            "userFrom": $(this).data('userid'),
            "userTo": $(SELECTORS.USERFROM).data('userid'),
        };
        let url = '/apis/unFriend';
        ajaxHelper.POST(url, formData).then((response) => {
            if (response) {
                $(this).html('Add Friend');
                $(this).addClass(CLASSNAMES.SENDREQUEST);
                $(this).removeClass(CLASSNAMES.UNFRIEND);
                $(SELECTORS.SENDREQUEST).on('click', sendFriendRequest);
            }
        }).catch((error) => {
            console.log(error);
        });
    };
})();
