var express = require('express');
var path = require("path");
var rootPath = path.join(__dirname, '../');
var routes = require(rootPath + '/services/routes.js');
var chokidar = require('chokidar');
var markoReload = require('marko/hot-reload');
var path = require("path");
markoReload.enable();
var watcher = chokidar.watch(rootPath+'/modules/');

module.exports = function(app) {
    watcher.on('change', function(filename) {
        if (/\.marko$/.test(filename)) {
            var templatePath = path.join(filename);
            markoReload.handleFileModified(templatePath);
        }
    });
    app.use(express.static(rootPath + 'public'));
    app.use('/', routes);
};
