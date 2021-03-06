//node modules
const axios = require('axios');

const GLOBALCONSTANTS = require('../config/constants');

let host = GLOBALCONSTANTS.APPCONFIG.HOST + '/apis';
let apiService = {};

apiService.get = (url) => {
    return axios.get(host + url);
};

apiService.post = (url, postData) => {
    return axios.post(host + url, postData);
};

module.exports = apiService;
