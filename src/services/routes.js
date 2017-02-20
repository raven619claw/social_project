const express = require('express');
const router = express.Router();
const controllers = require('./controllers.js')();

const globalConstants = require('../config/constants.js');

router.use(function(req, res, next){
	globalConstants.logger.log('data', req.method.toString() +' '+ req.url);
	next();
});

router.get('/', function(req, res) {
    controllers.home(req, res);
});

module.exports = router;
