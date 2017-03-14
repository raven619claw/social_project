//node modules
const express = require('express');
const router = express.Router();
const session = require('express-session');

//built in globals
const sessionGlobal = require('./sessionService');
const GLOBALCONSTANTS = require('../config/constants');
const userLoginService = require('./userLoginService');
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
    })
    .post(function(req, res) {
        let userData;

        userLoginService.userAuth(req.body, req.session)
            .then((userData) => {
                req.session = sessionGlobal.setSessionObject(req.session, userData);
                GLOBALCONSTANTS.LOGGER.LOG('data', 'rendering home module for POST request');
                controllers.home(req, res, userData);
            }, (err) => {
                GLOBALCONSTANTS.LOGGER.LOG('data', 'error in request');
                res.end('error');
            });
    });

router.all('/apis*', function(req, res) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' API request received at ' + req.url );
    controllers.apis(req, res);
});
module.exports = router;
