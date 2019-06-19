var userService = require('../services/user-service');
var dataService = require('../services/data-service');
var bodyParser = require('../services/body-parser');

module.exports = function writeHandler(req, res) {
	var token = req.headers['token'] || 0;
	var userId = +token;

	userService.findUser(userId, function (user) {
		if (!user) {
			res.writeHead(401);
			console.log('invalid token.');
			res.end('invalid token');
			return;
		}

		dataService.readData(function (data) {
			var userdata = data[userId];
			!userdata && (userdata = data[userId] = { id: userId });
			bodyParser.parse(req, function (model) {
				userdata.todos = model.todos;
				userdata.filter = model.filter;

				dataService.writeData(data, function () {
					console.log('writeData() done successfully.');
					res.writeHead(200);
					res.end();
				}, function (err) {
					res.writeHead(500);
					res.end(err);
				});

			});
		}, function (err) {
			res.writeHead(500);
			res.end(err);
		});

	}, function (err) {
		res.writeHead(500);
		res.end(err);
	});
}