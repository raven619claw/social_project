//node modules
const express = require('express');
const chokidar = require('chokidar');
const markoReload = require('marko/hot-reload');
const bodyParser = require('body-parser');
const path = require("path");
const session = require('express-session');
const markoExpress = require('marko/express');
const busboy = require('connect-busboy');

//built in globals
require('./dbConfig.js')
const GLOBALCONSTANTS = require('./constants');

const upload = require(GLOBALCONSTANTS.ROOTPATH + '/services/helpers/awsBlobUpload.js');
const routes = require(GLOBALCONSTANTS.ROOTPATH + '/services/routes');

const watcher = chokidar.watch(GLOBALCONSTANTS.ROOTPATH);

markoReload.enable();

const server = (app) => {
    watcher.on('change', function(filename) {
        if (/\.marko$/.test(filename)) {
            var templatePath = path.join(filename);
            markoReload.handleFileModified(templatePath);
        }
    });
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {}
    }));
    app.use(markoExpress());
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(busboy());
    app.use(express.static(GLOBALCONSTANTS.ROOTPATH + 'public'));
    app.use(express.static(GLOBALCONSTANTS.PROJECTROOTPATH + 'dev'));
    app.use((err, req, res, next) => {
        if (err instanceof SyntaxError &&
            err.status >= 400 && err.status < 500 &&
            err.message.indexOf('JSON')) {
            GLOBALCONSTANTS.LOGGER.LOG('error', 'JSON format error');
            res.end('JSON error');
        } else {
            next();
        }

    });
    app.use('/', routes);
};

module.exports = {
    server
}
