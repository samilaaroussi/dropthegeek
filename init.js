var express = require('express');
var serveIndex = require('serve-index');
var glob = require('glob-all');

var app = express();
var serverPort = 3000;


app.use(express.static(__dirname + '/public/'));
app.use('/assets', serveIndex('public/assets/objects', {'icons': true}))



var files = glob.sync([
    'public/assets/objects/**',
    '!public/assets/objects'
]);

for(var index in files) {
    files[index] = files[index].replace('public/assets/objects/','').replace('.png','');

}

console.log(files);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(serverPort, function () {
    console.log('Listening on : ' + serverPort);
});
