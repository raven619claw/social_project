exports.getAction = (userId, friendUserData) => {
    let action, btnText;
    if (userId == friendUserData.requestData.from) {
        action = 'pending';
        btnText = 'pending';
    }
    if (userId == friendUserData.requestData.to) {
        action = 'acceptRequest';
        btnText = 'Accept Request';
    }
    let result = {
        action: action,
        btnText: btnText
    };
    return result;
};
