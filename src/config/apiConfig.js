apiConfig = {
    singleUserDetails(username) {
        return {
            method: 'GET',
            url: `/users?username=${username}`
        }
    },
    getUserPost(userid) {
        console.log(userid,'in apiConfig');
        return {
            method: 'GET',
            url: `/getUserPosts?userid=${userid}`
        }
    }

};


module.exports = apiConfig;
