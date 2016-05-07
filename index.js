var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public/'));

var serverPort = 3000;


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


app.listen(serverPort, function () {
    console.log('Listening on : ' + serverPort);
});
