//node modules
const express = require('express');
const router = express.Router();
const session = require('express-session');

//built in globals
const routerHelperObject = require('./routerhelper');
const GLOBALCONSTANTS = require('../config/constants');
let controllers;
let sessionObject = false;
router.use(function(req, res, next) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' ' + req.url);
    controllers = require('./controllers.js')();
    sessionObject = routerHelperObject.getSessionObject(sessionObject, req);
    next();
});

router.route('/')
    .get(function(req, res) {
        let userData = routerHelperObject.getUserDataFromSession(sessionObject);
        GLOBALCONSTANTS.LOGGER.LOG('data', 'rendering home module for GET request');
        controllers.home(req, res, userData);
    })
    .post(function(req, res) {
        let userData;

        let userDataPromise = new Promise((resolve, reject) => {
            routerHelperObject.userAuth(req.body, sessionObject)
            .then((userData)=>{
                resolve(userData);    
            });
            
        });
        userDataPromise.then((result) => {
            userData = result;
            sessionObject = routerHelperObject.setSessionObject(sessionObject, userData);
            GLOBALCONSTANTS.LOGGER.LOG('data', 'rendering home module for POST request');
            controllers.home(req, res, userData);
        });


    });

module.exports = router;
