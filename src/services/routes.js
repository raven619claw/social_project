var express = require('express');
var router = express.Router();
var controllers = require('./controllers.js')();
router.get('/', function(req, res) {
    controllers.home(req, res);
});

module.exports = router;
