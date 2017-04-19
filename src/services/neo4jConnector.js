//node modules
const neo4j = require('neo4j-driver').v1;

const GLOBALCONSTANTS = require('../config/constants');

let DB_HOST= GLOBALCONSTANTS.APPCONFIG.DB_HOST;
let DB_USERNAME = GLOBALCONSTANTS.APPCONFIG.DB_USERNAME;
let DB_PASSWORD= GLOBALCONSTANTS.APPCONFIG.DB_PASSWORD;

var driver = neo4j.driver(DB_HOST, neo4j.auth.basic(DB_USERNAME, DB_PASSWORD));
var dbSession = driver.session();

module.exports = dbSession;
