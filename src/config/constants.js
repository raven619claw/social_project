//node module
const path = require("path");

//built in globals
const logger = require('../services/logger');
const rootPath = path.join(__dirname, '../');

module.exports = {
	rootPath,
	logger
}