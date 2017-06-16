var popupObject = {};

var $popupEl = $('.js-popup');
popupObject.openPopup = function(selector, content, data) {
    selector = selector || '.js-closePopup';
    data = data || {};
    content.renderSync(data).appendTo($popupEl[0]);
    $popupEl.removeClass('hide');
    $(selector).on('click', function() {
        popupObject.closePopup(selector);
    });
};

popupObject.closePopup = function(selector) {
    $(selector).off('click');
    $popupEl.addClass('hide');
    $popupEl.text('');
};



module.exports = popupObject;
