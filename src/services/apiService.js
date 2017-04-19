//node modules
const axios = require('axios');

const GLOBALCONSTANTS = require('../config/constants');

let host = GLOBALCONSTANTS.APPCONFIG.HOST+'/apis';
let apiService = {};

apiService.get = (url) => {
    return axios.get(host + url);
};

module.exports = apiService;
