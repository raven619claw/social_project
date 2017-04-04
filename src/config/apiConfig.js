apiConfig = {
    singleUserDetails(username) {
        return {
            method: 'GET',
            url: `/users?username=${username}`
        }
    }

};


module.exports = apiConfig;
