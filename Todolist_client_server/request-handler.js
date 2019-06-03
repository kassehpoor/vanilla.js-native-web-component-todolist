var fs = require('fs');

var auth = require('./auth');

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

	// ================================================================================================

	function writeHandler(req, res) {
		var token = req.headers['token'] || 0;
		//////////////////////////////////////////////////////////////////
		var userId;
		var user;
		fs.readFile('./users.txt', function (err, users) {
			if (err) {
				console.log(err);
				res.writeHead(500);
				res.end();
				return;
			}
			user = users.find(u => u.id === token);
			if (!user) {
				res.writeHead(500);
				console.log('no data ...');
				res.end('error');
				return;
			}
			userId = user.id;
		});
		
		var bytes = [];
		req.on('data', chunk => {
			bytes.push(chunk)
		});
		req.on('end', () => {
			obj = {userId :bytes};
			data =obj.toString('utf8');
			
			fs.writeFile('storage.txt', data, err => {
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
	}

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
			var result = data[userId];
			res.writeHead(200);
			res.write(JSON.stringify(result));
			res.end();
		});
	}

	function indexHandler(req, res) {
		req.url = 'index.html';
		staticFileHandler(req, res);
	}

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

	function authHandler() {

		var username = req.headers['username'];
		var password = req.headers['password'];

		var user = auth.authenticate(username, password);

		if (!user) {
			res.writeHead(401, 'invalid usename or password');
			res.end();
			return;
		}
		res.writeHead(200);
		res.write(JSON.stringify(user));
		res.end();
	}
}