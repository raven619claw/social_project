//node modules
const express = require('express');
const path = require("path");
const chokidar = require('chokidar');
const markoReload = require('marko/hot-reload');

//built globals
const rootPath = path.join(__dirname, '../');
const routes = require(rootPath + '/services/routes.js');
const logger = require(rootPath + '/services/logger.js');
const watcher = chokidar.watch(rootPath + '/modules/');

markoReload.enable();

const server = (app) => {
    app.use(express.static(rootPath + 'public'));
    watcher.on('change', function(filename) {
        if (/\.marko$/.test(filename)) {
            var templatePath = path.join(filename);
            markoReload.handleFileModified(templatePath);
        }
    });

    app.use('/', routes);
};

module.exports = {
    server,
    logger
}
