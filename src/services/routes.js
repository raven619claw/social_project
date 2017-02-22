//node modules
const express = require('express');
const router = express.Router();

//built in globals
const routerHelperObject = require('./routerhelper');
const GLOBALCONSTANTS = require('../config/constants');
let controllers;
router.use(function(req, res, next) {
    GLOBALCONSTANTS.LOGGER.LOG('data', req.method.toString() + ' ' + req.url);
    controllers = require('./controllers.js')();
    next();
});

router.get('/', function(req, res) {
    controllers.home(req, res, false);
});

router.post('/', function(req, res) {
	let userData = routerHelperObject.userAuth(req.body);
    controllers.home(req, res, userData);

});

module.exports = router;
