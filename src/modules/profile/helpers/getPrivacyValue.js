exports.getPrivacyValue = (privacy) => {
    switch (privacy.toString()) {
        case '0':
            return 'only me';
            break;
        case '1':
            return 'friends';
            break;
        case '2':
            return 'everyone';
            break;
    }
};
