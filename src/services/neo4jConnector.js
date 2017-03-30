//node modules
const neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver(process.env.DB_HOST, neo4j.auth.basic(process.env.DB_USERNAME, process.env.DB_PASSWORD));
var dbSession = driver.session();

module.exports = dbSession;
