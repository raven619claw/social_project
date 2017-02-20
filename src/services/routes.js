var express = require('express');
var router = express.Router();
var controllers = require('./controllers.js')();
var logger = require('./logger');
router.use(function(req, res, next){
	logger.log('data', req.method.toString() +' '+ req.url);
	next();
});

router.get('/', function(req, res) {
    controllers.home(req, res);
});

module.exports = router;
