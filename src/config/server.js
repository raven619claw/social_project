//node modules
const express = require('express');
const chokidar = require('chokidar');
const markoReload = require('marko/hot-reload');

//built in globals
const globalConstants = require('../config/constants.js');
const routes = require(globalConstants.rootPath + '/services/routes.js');
const watcher = chokidar.watch(globalConstants.rootPath + '/modules/');

markoReload.enable();

const server = (app) => {
    app.use(express.static(globalConstants.rootPath + 'public'));
    watcher.on('change', function(filename) {
        if (/\.marko$/.test(filename)) {
            var templatePath = path.join(filename);
            markoReload.handleFileModified(templatePath);
        }
    });

    app.use('/', routes);
};

module.exports = {
    server
}
