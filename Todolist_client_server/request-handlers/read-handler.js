var fs = require('fs');

var filePath = './data/storage.txt';

module.exports = function readHandler(req, res) {
	var token = req.headers['token'] || 0;
	var userId = token;
	res.writeHead(200, { 'Content-Type': 'text/json' });
	fs.readFile(filePath, function (err, content) {
		if (err) {
			console.log(err);
			res.writeHead(500);
			res.end();
			return;
		}
		var data = JSON.parse(content);
		var result = data[userId] || {};
		res.writeHead(200);
		res.write(JSON.stringify(result));
		res.end();
	});
}