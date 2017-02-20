let express = require('express');
let app = express();
let server = require('./src/config/server');

const globalConstants = require('./src/config/constants.js');

server.server(app);
app.listen(3000, ()=> {
    globalConstants.logger.log('verbose', 'app listening on port 3000');
});
