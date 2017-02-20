let express = require('express');
let app = express();
let server = require('./src/config/server');

server.server(app);
app.listen(3000, ()=> {
    server.logger.log('verbose', 'app listening on port 3000');
});
