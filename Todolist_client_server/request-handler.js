var fs = require('fs');

var auth = require('./auth');

var userService = require('./user-service');

var dataService = require('./data-service');

exports.requestHnadler = function requestHnadler(req, res) {
	console.log(req.method, req.url);

	var routeHandler = ({
		'GET': {
			'/': indexHandler,
			'/read': readHandler
		},
		'POST': {
			'/write': writeHandler,
			'/auth': authHandler
		},

	})[req.method][req.url];

	if (!routeHandler) {
		routeHandler = staticFileHandler;
	}

	routeHandler(req, res);
}

// =======================================================================
/*
function _writeHandler(req, res) {
	var token = req.headers['token'] || 0;// token is a string
	var userId = +token;
	fs.readFile('./users.txt', function (err, result) {
		if (err) {
			console.log(err);
			res.writeHead(500);
			res.end();
			return;
		}
		var users = JSON.parse(result);
		var user = users.find(u => u.id === userId);
		if (!user) {
			res.writeHead(500);
			console.log('error in recognizing user...');
			res.end('invalid token');
			return;
		}
		fs.readFile('./storage.txt', function (err, content) {
			if (err) {
				console.log(err);
				res.writeHead(500);
				res.end();
				return;
			}
			var data = JSON.parse(content);
			var userdata = data[userId];
			!userdata && (userdata = data[userId] = { id: userId });

			var bytes = [];
			req.on('data', chunk => {
				bytes.push(chunk)
			});
			req.on('end', () => {
				var value = bytes.toString('utf8'); // TODO:...
				var model = JSON.parse(value);
				userdata.todos = model.todos;
				userdata.filter = model.filter;

				fs.writeFile('storage.txt', JSON.stringify(data), err => {
					if (err) {
						console.log(err);
						res.writeHead(500);
						res.end();
						return;
					}
					console.log('successfully written to storage.txt file !');
					res.writeHead(200, { 'Content-Type': 'text/json' });
					res.end();
				});
			});
		});
	});
}
*/

//----------------------------------------------------
function writeHandler(req, res) {
	var token = req.headers['token'] || 0;
	var userId = +token;

	userService.findUser(userId, function (err, user) {

		if (err) {
			res.writeHead(500);
			res.end('an error occured: ' + err);
			return;
		}

		if (!user) {
			res.writeHead(401);
			console.log('invalid token.');
			res.end('invalid token');
			return;
		}

		dataService.readUserData(userId, function (userdata, data, err) {
			if (err) {
				res.writeHead(500);
				res.end('error in data reading...');
				return;
			}
			var bytes = [];
			req.on('data', chunk => {
				bytes.push(chunk)
			});
			req.on('end', () => {
				var value = bytes.toString('utf8');
				var model = JSON.parse(value);
				userdata.todos = model.todos;
				userdata.filter = model.filter;

				dataService.writeData(data, function (err) {
					if (err) {
						res.writeHead(500);
						res.end('error in writing data...');
						return;
					}
					console.log('successfully written to storage.txt file !');
					res.writeHead(200, { 'Content-Type': 'text/json' });
					res.end();
				});

			});
		});

	});


}
//-----------------------------------------------------

function readHandler(req, res) {
	var token = req.headers['token'] || 0;
	var userId = token;
	res.writeHead(200, { 'Content-Type': 'text/json' });
	fs.readFile('./storage.txt', function (err, content) {
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

//-----------------------------------------------------

function indexHandler(req, res) {
	req.url = 'index.html';
	staticFileHandler(req, res);
}

//-----------------------------------------------------

function staticFileHandler(req, res) {
	fs.readFile('./Client/' + req.url, function (err, data) {
		if (err) {
			res.writeHead(500);
			console.error(err + 'problem.............');
			res.end('error');
		} else {
			res.writeHead(200);
			res.write(data);
			res.end();
		}
	});
}

//-----------------------------------------------------

function authHandler(req, res) {

	var username = req.headers['username'];
	var password = req.headers['password'];

	auth.authenticate(username, password, function (user) {
		if (!user) {
			res.writeHead(401);
			res.end('invalid username or password !!');
			return;
		}
		res.writeHead(200);
		res.write(JSON.stringify(user));
		res.end();
	});
}