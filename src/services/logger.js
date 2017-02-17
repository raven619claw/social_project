var colors = require('colors/safe');

var log = function(type, msg) {
    colors.setTheme({
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red'
    });
    var date = new Date().toGMTString();
    if (type == 'error') {
    	console.log(colors.debug('[' + date + '] ') + colors.error(msg));
    }
    if (type == 'info') {
        console.log(colors.debug('[' + date + '] ') + colors.info(msg));
    }
    if (type == 'warning') {
    	console.log(colors.debug('[' + date + '] ') + colors.yellow(msg));
    }
    if (type == 'verbose') {
    	console.log(colors.debug('[' + date + '] ') + colors.verbose(msg));
    }
    if (type == 'data') {
    	console.log(colors.debug('[' + date + '] ') + colors.data(msg));
    }

};
module.exports = {
	log: log
};
