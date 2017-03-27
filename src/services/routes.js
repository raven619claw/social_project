//node modules
const express = require('express');
const router = express.Router();
const session = require('express-session');

//built in globals
const sessionGlobal = require('./sessionService');
const GLOBALCONSTANTS = require('../config/constants');
let controllers;

router.use(function(req, res, next) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' ' + req.url);
    controllers = require('./controllers.js')();
    next();
});

router.route('/')
    .get(function(req, res) {
        let userData = sessionGlobal.getUserDataFromSession(req.session);
        GLOBALCONSTANTS.LOGGER.LOG('data', 'rendering home module for GET request');
        controllers.home(req, res, userData);
    });

router.all('/apis*', function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url);
    controllers.apis(req, res);
});
module.exports = router;
