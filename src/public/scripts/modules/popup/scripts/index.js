var popupObject={};

var $popupEl = $('.js-popup');
popupObject.openPopup= function(selector, content){
	content.renderSync({}).appendTo($popupEl[0]);
	$popupEl.removeClass('hide');
	$(selector).on('click',function(){
		popupObject.closePopup();
	});
};

popupObject.closePopup= function(){
	$popupEl.addClass('hide');
	$popupEl.text('');
};



module.exports = popupObject;