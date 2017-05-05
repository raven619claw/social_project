import ajaxHelper from './modules/helpers/scripts/ajaxHelper.js';
import Utils from './modules/helpers/scripts/utils.js';

(function() {
    const SocialLogin = require('./modules/gSignIn/scripts/index');
    const signInModule = require('../templates/signIn/template');
    const popupObject = require('./modules/popup/scripts/index');
    SocialLogin.load();

    var SELECTORS = {
        LOGINFORM: '.js-formAction',
        INPUTNAME: '.js-name',
        INPUTPASSWORD: '.js-password',
        INPUTLOGINTYPE: '.js-logintype',
        INPUTLOGINBTN: '.js-submitLogin',
        INPUTLOGOUTBTN: '.js-submitLogout',
        VIEWLOGGEDIN: '.js-loggedIn',
        LOGINFAIL: '.js-logInFail',
        USERNAMEFIELD: '.js-showUsername',
        SIGNUPBTN: '.js-signUpBtn',
        GLOGINBTN: '.js-gloginBtn',
        GLOGOUTBTN: '.js-glogoutBtn',
        OPENSIGNIN: '.js-openSignInpopup'
    };
    $(SELECTORS.OPENSIGNIN).on('click', function() {
        popupObject.openPopup('.js-closePopup', signInModule);
        bindEvents();
    });

    bindEvents();

    function bindEvents() {
        $(SELECTORS.INPUTLOGINBTN).on('click', function() {
            if (validate()) {
                login();
            } else {
                showError('please fill in the username and password')
            }

        });
        $(SELECTORS.INPUTLOGOUTBTN).on('click', function() {
            logout();
        });
        $(SELECTORS.GLOGINBTN).on('click', function() {
            let auth2 = gapi.auth2.getAuthInstance();
            if (auth2.isSignedIn.get()) {
                let googleUser = auth2.currentUser.get();
                socialLogin('google', googleUser);
            } else {
                SocialLogin.login().then(
                    () => {
                        if (auth2.isSignedIn.get()) {
                            let googleUser = auth2.currentUser.get();
                            let profile = googleUser.getBasicProfile();
                            console.log('user logged in')
                            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                            console.log('Name: ' + profile.getName());
                            console.log('Token ID: ' + googleUser.getAuthResponse().id_token);
                            console.log('Image URL: ' + profile.getImageUrl());
                            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
                            socialLogin('google', googleUser);
                        } else {
                            console.log('Google_failed');
                        }
                    });
            }

        });
        $(SELECTORS.GLOGOUTBTN).on('click', function() {
            SocialLogin.signOut().then(() => {
                logout();
            });
        });
    };

    function validate() {

        if (($(SELECTORS.INPUTNAME).val().length > 0) && ($(SELECTORS.INPUTPASSWORD).val().length > 0))
            return true;
        return false;
    };

    function login() {
        var formData = {
            "username": $(SELECTORS.INPUTNAME).val(),
            "password": $(SELECTORS.INPUTPASSWORD).val()
        };
        // clearInput();
        let url = '/apis/userAuth';
        ajaxHelper.POST(url, formData).then((response) => {
            let data = response.data;

            if (data.loginStatus.password) {
                showLoggedIn();
            } else if (data.loginStatus.username) {
                showError(formData.username + 'your password is wrong');
            } else {
                showError(formData.username + 'your username is wrong');
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    function clearInput() {
        $(SELECTORS.INPUTNAME).val('');
        $(SELECTORS.INPUTPASSWORD).val('');
    };

    function showLoggedIn() {
        window.location = Utils.CURRENT_URL;

    };

    function showError(msg) {
        $(SELECTORS.LOGINFAIL).text(msg);
        setTimeout(function() {
            $(SELECTORS.LOGINFAIL).text('');
        }, 5000);
    }

    function logout() {
        let auth2 = gapi.auth2.getAuthInstance();
        if (auth2.isSignedIn.get()) {
            auth2.signOut().then(() => {
                let url = '/apis/user/logout';
                ajaxHelper.GET(url, {}).then((response) => {
                    window.location = Utils.CURRENT_URL;
                }).catch((error) => {
                    console.log(error);
                });
            });
        } else {
            let url = '/apis/user/logout';
            ajaxHelper.GET(url, {}).then((response) => {
                window.location = Utils.CURRENT_URL;
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    function socialLogin(type, googleUser) {
        var formData = {};
        switch (type) {
            case 'google':
                formData = {
                    "userType": 'google',
                    "email": googleUser.getBasicProfile().getEmail(),
                    "token": googleUser.getAuthResponse().id_token,
                    "username": googleUser.getBasicProfile().getEmail()
                };
                let url = '/apis/userSocialAuth';
                ajaxHelper.PUT(url, formData).then((response) => {
                    let data = response.data;
                    if (data.user.username) {
                        showLoggedIn(data.user.username);
                    } else {

                    }
                }).catch((error) => {
                    console.log(error);
                });
                break;
        };
    };

})();
