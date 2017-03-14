var SELECTORS = {
    LOGINFORM: '.js-form-action',
    INPUTNAME: '.js-name',
    INPUTPASSWORD: '.js-password',
    INPUTLOGINTYPE: '.js-logintype',
    INPUTLOGINBTN: '.js-submitLogin',
    INPUTLOGOUTBTN: '.js-submitLogout',
    VIEWLOGGEDIN: '.js-loggedIn',
    LOGINFAIL: '.js-logInFail',
    USERNAMEFIELD: '.js-showUsername'
};
(function() {
    bindEvents();
})();


function bindEvents() {
    $(SELECTORS.INPUTLOGINBTN).on('click', function() {
        if (validate()) {
            login();
        }else{
        	showError('please fill in the username and password')	
        }
        
    });
    $(SELECTORS.INPUTLOGOUTBTN).on('click', function() {
        logout();
    });
};

function validate() {

    if (($(SELECTORS.INPUTNAME).val().length > 0) && ($(SELECTORS.INPUTPASSWORD).val().length > 0))
        return true;
    return false;
};

function login() {
    var formData = {
        "name": $(SELECTORS.INPUTNAME).val(),
        "password": $(SELECTORS.INPUTPASSWORD).val()
    };
    clearInput();
    $.ajax({
        url: "http://localhost:3000/apis/userAuth",
        type: "POST",
        data: formData,
        success: function(data, textStatus, jqXHR) {
        	data = JSON.parse(data);
            if (data.loginStatus.password) {
            	showLoggedIn(data.user.username);
            } else if (data.loginStatus.user) {
            	showError(formData.name +'your password is wrong');
            } else {
            	showError(formData.name +'your username is wrong');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {

        }
    });
};

function clearInput(){
	$(SELECTORS.INPUTNAME).val('');
	$(SELECTORS.INPUTPASSWORD).val('');
};

function showLoggedIn(username){
	$(SELECTORS.LOGINFORM).addClass('hide');
	$(SELECTORS.VIEWLOGGEDIN).removeClass('hide');
	$(SELECTORS.USERNAMEFIELD).text(username);
};

function showError(msg){
	$(SELECTORS.LOGINFAIL).text(msg);
	setTimeout(function(){
		$(SELECTORS.LOGINFAIL).text('');
	},5000);
}

function logout(){
	$(SELECTORS.LOGINFORM).removeClass('hide');
	$(SELECTORS.VIEWLOGGEDIN).addClass('hide');
	$(SELECTORS.USERNAMEFIELD).text('');
	$.ajax({
	    url: "http://localhost:3000/apis/user/logout",
	    type: "GET",
	    success: function(data, textStatus, jqXHR) {
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	    }
	});
}
