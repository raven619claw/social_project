//node modules
const neo4j = require('neo4j-driver').v1;

let DB_HOST= process.env.DB_HOST || 'bolt://localhost:7687';
let DB_USERNAME = process.env.DB_USERNAME || 'neo4j';
let DB_PASSWORD= process.env.DB_PASSWORD || 'admin123';

var driver = neo4j.driver(DB_HOST, neo4j.auth.basic(DB_USERNAME, DB_PASSWORD));
var dbSession = driver.session();

module.exports = dbSession;
