const colors = require('colors/safe');
const fs = require('fs');

const log = (type, msg) => {
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
    let date = new Date().toGMTString();
    if (type == 'error') {
        console.log(colors.debug('[' + date + '] ') + colors.error(msg));
    }
    if (type == 'info') {
        console.log(colors.info('[' + date + '] ') + colors.info(msg));
    }
    if (type == 'warning') {
        console.log(colors.debug('[' + date + '] ') + colors.yellow(msg));
    }
    if (type == 'verbose') {
        console.log(colors.debug('[' + date + '] ') + colors.verbose(msg));
    }
    if (type == 'data') {
        console.log(colors.data('[' + date + '] ') + colors.data(msg));
    }
    logToFile(date, msg, true);
};

const logToFile = (date, msg, flag) => {
    if (flag) {
        fs.appendFile('logFile.log', '[ ' + date + ' ] ' + ' ' + msg + '\n', (err, fd) => {
            if (err) {
                return console.log('unable to write to log file');
            } else {
                //return console.log('written to log file');
            }
        });

    }
};
module.exports = {
    log,
    logToFile
};
