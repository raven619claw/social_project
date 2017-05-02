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
    getHomePost(userid) {
        return {
            method: 'GET',
            url: `/getHomePosts?userid=${userid}`
        }
    },
    getUserSuggestions() {
        return {
            method: 'POST',
            url: `/getUserSuggestions`
        }
    },
    getFriendData() {
        return {
            method: 'POST',
            url: `/getFriendData`
        }
    }

};


module.exports = apiConfig;
