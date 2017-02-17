//node modules
var path = require("path");
var rootPath = path.join(__dirname, '../');
var express = require('express');
var routes = require(rootPath + '/services/routes.js');
var chokidar = require('chokidar');
var markoReload = require('marko/hot-reload');

//built globals
var logger = require(rootPath + '/services/logger.js');
var watcher = chokidar.watch(rootPath + '/modules/');

markoReload.enable();

var server = function(app) {
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
    server: server,
    logger: logger
}
