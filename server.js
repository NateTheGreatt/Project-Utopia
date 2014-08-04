var express = require('express');
var http = require('http');
var io = require('socket.io');

var app = express();
var server = http.createServer(app);
var socketServer = io.listen(server);

app.use(express.static(__dirname + '/client'));

app.get('/', function (req, res) {
    res.sendfile('client/index.html');
});

socketServer.set('log level', 1);

server.listen(3000);
console.log("Starting server on port 3000");
//# sourceMappingURL=server.js.map
