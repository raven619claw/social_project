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
            $.ajax({
                url: "http://localhost:3000/apis/createPost",
                type: "PUT",
                data: formData,
                success: function(data, textStatus, jqXHR) {
                    window.location = "http://localhost:3000/";
                },
                error: function(jqXHR, textStatus, errorThrown) {

                }
            });
        } else {
            $(SELECTORS.PARENT).find(SELECTORS.ERROR).removeClass('hide');
        }
    };
})();
