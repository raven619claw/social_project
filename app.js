var express = require('express');
var app = express();

require('./src/config/server')(app);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
