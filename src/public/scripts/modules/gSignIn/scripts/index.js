var SocialLogin = {};
var config = {};
config.gPlusAppId = '897079810231-n20lmv476ql8a7k6qam4firsg8d3ktcl';
config.gPlusRedirectUri = '/';
var auth2, googleUser;
module.exports = {
    load: function() {
        $.getScript("//apis.google.com/js/client.js", function() {
            if (gapi.auth2 && gapi.auth2.getAuthInstance()) {
                window.auth2 = gapi.auth2.getAuthInstance();
            } else {
                gapi.load('auth2', function() {
                    gapi.auth2.init({
                        client_id: config.gPlusAppId + '.apps.googleusercontent.com',
                        scope: 'profile',
                        redirect_uri: config.gPlusRedirectUri
                    }).then(
                        function() {
                            window.auth2 = gapi.auth2.getAuthInstance();
                        },
                        function(error) {
                            console.log(error);
                        });
                });
            }
        });
    },
    login: function() {
        var that = this;

        if (auth2) {
            if (!auth2.isSignedIn.get()) {
                return auth2.signIn();
            }
        }
    },
    signOut: function() {
        return auth2.signOut();
    },
    signInCallback: function() {
        var authResult = gapi.auth2.getAuthInstance();
        if (auth2.isSignedIn.get()) {
            googleUser = auth2.currentUser.get();
            let profile = googleUser.getBasicProfile();
            console.log('user logged in')
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Token ID: ' + googleUser.getAuthResponse().id_token);
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            return new Promise()
        } else {
            console.log('Google_failed');
        }
    }
};
