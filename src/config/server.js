//node modules
var express = require('express');
var path = require("path");
var chokidar = require('chokidar');
var markoReload = require('marko/hot-reload');
var path = require("path");

//built globals
var rootPath = path.join(__dirname, '../');
var routes = require(rootPath + '/services/routes.js');
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
