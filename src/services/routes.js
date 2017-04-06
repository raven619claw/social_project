//node modules
const express = require('express');
const router = express.Router();
const session = require('express-session');

//built in globals
const sessionGlobal = require('./sessionService');
const GLOBALCONSTANTS = require('../config/constants');
let controllers;
controllers = require('./controllers.js')();
router.use(function(req, res, next) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' ' + req.url);
    next();
});

Object.keys(controllers).forEach((controller)=>{
    controllers[controller].setup(router);
});

module.exports = router;
