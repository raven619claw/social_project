//node modules
const express = require('express');
const router = express.Router();
const session = require('express-session');

//built in globals
const sessionGlobal  = require('./sessionService');
const GLOBALCONSTANTS = require('../config/constants');
const userLoginService = require('./userLoginService');
let controllers;
let sessionObject = false;
router.use(function(req, res, next) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' ' + req.url);
    controllers = require('./controllers.js')();
    sessionObject = sessionGlobal.getSessionObject(sessionObject, req);
    next();
});

router.route('/')
    .get(function(req, res) {
        let userData = sessionGlobal.getUserDataFromSession(sessionObject);
        GLOBALCONSTANTS.LOGGER.LOG('data', 'rendering home module for GET request');
        controllers.home(req, res, userData);
    })
    .post(function(req, res) {
        let userData;

        userLoginService.userAuth(req.body, sessionObject)
            .then((userData) => {
                sessionObject = sessionGlobal.setSessionObject(sessionObject, userData);
                GLOBALCONSTANTS.LOGGER.LOG('data', 'rendering home module for POST request');
                controllers.home(req, res, userData);
            }, (err) => {
                GLOBALCONSTANTS.LOGGER.LOG('data', 'error in request');
                res.end('error');
            });
    });

module.exports = router;
