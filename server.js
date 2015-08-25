express = require('express');
var app = express();

app.use('/', express.static('build'));
var port = process.env.PORT || 5000;
app.listen(port);