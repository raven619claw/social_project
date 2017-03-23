const singUpModule = require('../templates/signUp/template');
const popupObject = require('./modules/popup/scripts/index');

const SELECTORS = {
    INPUTNAME: '.js-input-name',
    INPUTPASSWORD: '.js-input-pass',
    INPUTPASSWORDCONFIRM: '.js-input-pass-confirm',
    INPUTSIGNUPBTN: '.js-signup-btn',
    INPUTERROR: '.js-error-field',
    SIGNUPPARENT: '.js-loginDetails',
    SIGNUPBTN: '.js-signUpBtn'
};

$(SELECTORS.SIGNUPBTN).on('click', function() {
    popupObject.openPopup('.js-closePopup', singUpModule);
    bindEvents();
});


function bindEvents() {
    $(SELECTORS.INPUTNAME).on('focusout', function() {
        checkUserName($(SELECTORS.INPUTNAME), function(flag) {});
    });

    $(SELECTORS.INPUTPASSWORD).on('focusout', function() {
        validatePassword([$(SELECTORS.INPUTPASSWORD)], 0);
    });

    $(SELECTORS.INPUTPASSWORDCONFIRM).on('focusout', function() {
        validatePassword([$(SELECTORS.INPUTPASSWORD), $(SELECTORS.INPUTPASSWORDCONFIRM)], 1);
    });

    $(SELECTORS.INPUTSIGNUPBTN).on('click', function() {
        createUser();
    });
};

function checkUserName(selector, callback) {
    if (!selector.find('input').val()) {
        showError(selector, 'enter valid username');
        callback(false);
        return false;
    }
    showError(selector, '');
    $.ajax({
        url: "http://localhost:3000/apis/checkUser?username=" + selector.find('input').val(),
        type: "GET",
        success: function(data, textStatus, jqXHR) {
            data = JSON.parse(data);
            if (data.user) {
                showError(selector, selector.find('input').val() + ' username already exists');
            } else {
                showError(selector, '');
            }
            callback(!data.user);
        },
        error: function(jqXHR, textStatus, errorThrown) {

        }
    });
};

function showError(selector, msg) {
    selector.find(SELECTORS.INPUTERROR).text(msg);
    if (msg) {
        selector.find('input').addClass('error');
    } else {
        selector.find('input').removeClass('error');
    }

};

function validatePassword(selector, flag) {

    switch (flag) {
        case 0:
            if (!_checkPasswordLength(selector[0])) {
                showError(selector[0], 'password should be longer than 8 characters');
                return false;
            }
            showError(selector[0], '');
            return true;
        default:
            if (_checkPasswordLength(selector[0])) {
                if (_checkConfirmPassword(selector)) {
                    showError(selector[1], '')
                    showError(selector[0], '')
                    return true;
                } else {
                    showError(selector[1], 'password do not match');
                    return false;
                }
            } else {
                showError(selector[0], 'password should be longer than 8 characters');
                return false;
            }
            break;
    }

    function _checkPasswordLength(selector) {
        if (selector.find('input').val().length < 8) {
            return false;
        }
        return true;
    };

    function _checkConfirmPassword(selector) {
        if (selector[0].find('input').val() != selector[1].find('input').val()) {
            return false;
        }
        return true;
    };

};

function createUser() {
    checkUserName($(SELECTORS.INPUTNAME), function(flag) {
        if (flag && validatePassword([$(SELECTORS.INPUTPASSWORD), $(SELECTORS.INPUTPASSWORDCONFIRM)], 1)) {
            createUserRequest();
        } else {
            validatePassword([$(SELECTORS.INPUTPASSWORD), $(SELECTORS.INPUTPASSWORDCONFIRM)], 1)
        }
    });
};

function createUserRequest() {
    var formData = {
        "username": $(SELECTORS.INPUTNAME).find('input').val(),
        "email": 'email@email.com',
        "userType": 'email',
        "password": $(SELECTORS.INPUTPASSWORD).find('input').val()
    };
    $.ajax({
        url: "http://localhost:3000/apis/createUser",
        type: "PUT",
        data: formData,
        success: function(data, textStatus, jqXHR) {
            data = JSON.parse(data);
            if (data.created) {
                loginAfterSignUp();
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {

        }
    });
};

function loginAfterSignUp() {
    var formData = {
        "username": $(SELECTORS.INPUTNAME).find('input').val(),
        "password": $(SELECTORS.INPUTPASSWORD).find('input').val()
    };
    $.ajax({
        url: "http://localhost:3000/apis/userAuth",
        type: "POST",
        data: formData,
        success: function(data, textStatus, jqXHR) {
            data = JSON.parse(data);
            window.location = "http://localhost:3000/"
        },
        error: function(jqXHR, textStatus, errorThrown) {

        }
    });
};
