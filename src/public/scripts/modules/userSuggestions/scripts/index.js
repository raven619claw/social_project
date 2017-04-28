import ajaxHelper from '../../helpers/scripts/ajaxHelper.js';
import Utils from '../../helpers/scripts/utils.js';

(() => {
    let SELECTORS = {
        'SENDREQUEST': '.js-sendRequest',
        'PARENT':'.js-userSuggestions',
        'USERFROM':'.js-userDetails'
    };

    bindEvents();

    function bindEvents() {
        $(SELECTORS.SENDREQUEST).on('click',sendFriendRequest);
    };

    function sendFriendRequest() {
            let formData = {
                "userFrom": $(SELECTORS.USERFROM).data('userid'),
                "userTo": $(this).data('userid'),
            };
            let url = '/apis/sendFriendRequest';
            ajaxHelper.POST(url, formData).then((response) => {
                if(response){
                    $(this).html('sent!');
                }
            }).catch((error) => {
                console.log(error);
            });
    };
})();
