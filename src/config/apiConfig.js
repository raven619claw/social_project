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
    }

};


module.exports = apiConfig;
