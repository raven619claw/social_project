let userAuth = (userData) => {
    userData.success = false;
    switch (userData.logintype) {
        case 'login':
            if (userData.name == 'ravi'|| userData.name == 'yadav' && userData.password == 'pass') {
                userData.success = true;
            }
            break;
        case 'logout':
        	userData = false;
            break;
    }
    return userData;
};

module.exports = {
    userAuth
};
