var http = require('http');
var requestHandler = require('./request-handler.js').requestHnadler;

const port = 9090;


var server = http.createServer(requestHandler);
server.listen(port);
server.on('listening', function () {
	console.log('Listenning on port ' + port);
});

