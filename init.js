var express = require('express');
var serveIndex = require('serve-index');

var app = express();
var serverPort = process.env.PORT ||3000;


app.use(express.static(__dirname + '/public/'));
app.use('/assets', serveIndex('public/assets/objects', {'icons': true}))


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(serverPort, function () {
    console.log('Listening on : ' + serverPort);
});
