apiConfig = {
    singleUserDetails(username) {
        return {
            method: 'GET',
            url: `/users?username=${username}`
        }
    },
    getUserPost(userid) {
        return {
            method: 'GET',
            url: `/getUserPosts?userid=${userid}`
        }
    },
    getUserSuggestions() {
        return {
            method: 'POST',
            url: `/getUserSuggestions`
        }
    }

};


module.exports = apiConfig;
