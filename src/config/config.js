let config = {};


let env = process.env.ENVIRONMENT || 'dev';
config.ENV = env;
switch (env) {
    case 'heroku':
        config.PORT = process.env.PORT;
        config.REDIS_PORT = process.env.HEROKU_REDIS_PORT;
        config.REDIS_HOST = process.env.HEROKU_REDIS_HOST;
        config.BASE_URL = process.env.HEROKU_BASE_URL;
        config.HOST = process.env.HEROKU_BASE_URL;
        config.DB_HOST = process.env.GRAPHENEDB_BOLT_URL;
        config.DB_USERNAME = process.env.GRAPHENEDB_BOLT_USER;
        config.DB_PASSWORD = process.env.GRAPHENEDB_BOLT_PASSWORD;
        config.MONGO_DB_URL = process.env.HEROKU_MONGO_DB_URL;
        break;
    case 'dev':
        config.PORT = process.env.PORT;
        config.REDIS_PORT = process.env.REDIS_PORT;
        config.REDIS_HOST = process.env.REDIS_HOST;
        config.HOST = process.env.BASE_URL + ':' + process.env.PORT;
        config.BASE_URL = process.env.BASE_URL;
        config.DB_HOST = process.env.DB_HOST;
        config.DB_USERNAME = process.env.DB_USERNAME;
        config.DB_PASSWORD = process.env.DB_PASSWORD;
        config.MONGO_DB_URL = process.env.MONGO_DB_URL;
        break;
}

module.exports = config;
