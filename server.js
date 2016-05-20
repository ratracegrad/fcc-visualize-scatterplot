var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(port, function() {
    console.log('Server listening on port ' + port + '...');
});