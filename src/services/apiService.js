//node modules
const axios = require('axios');
const host = process.env.BASE_URL+':'+process.env.APP_PORT+'/apis';
let apiService = {};

apiService.get = (url) => {
    return axios.get(host+url);
};

module.exports = apiService;
