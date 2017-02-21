//node modules
const express = require('express');
const chokidar = require('chokidar');
const markoReload = require('marko/hot-reload');
const path = require("path");

//built in globals
const GLOBALCONSTANTS = require('../config/constants');
const routes = require(GLOBALCONSTANTS.ROOTPATH + '/services/routes');
const watcher = chokidar.watch(GLOBALCONSTANTS.ROOTPATH);

markoReload.enable();

const server = (app) => {
    app.use(express.static(GLOBALCONSTANTS.ROOTPATH + 'public'));
    app.use('/', routes);

    watcher.on('change', function(filename) {
        if (/\.marko$/.test(filename)) {
            var templatePath = path.join(filename);
            markoReload.handleFileModified(templatePath);
        }
    });
};

module.exports = {
    server
}
