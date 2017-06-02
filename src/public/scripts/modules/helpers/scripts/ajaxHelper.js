import axios from 'axios';
import Utils from './utils.js';
let ajaxHelper = {};


ajaxHelper.GET = (url, params) => {
    url = Utils.BASE_URL + url;
    return axios.get(url, {
        params: params
    });
};

ajaxHelper.PUT = (url, data) => {
    url = Utils.BASE_URL + url;
    return axios.put(url, data);
};

ajaxHelper.POST = (url, data) => {
    url = Utils.BASE_URL + url;
    return axios.post(url, data);
};

module.exports = ajaxHelper;
