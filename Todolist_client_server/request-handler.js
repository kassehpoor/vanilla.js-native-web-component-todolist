var fs = require('fs');

exports.requestHnadler = function requestHnadler(req, res) {
	console.log(req.method, req.url);

	var routeHandler = ({
		'GET': {
			'/': indexHandler,
			'/read': readHandler
		},
		'POST': {
			'/write': writeHandler
		}
	})[req.method][req.url];

	if (!routeHandler) {
		routeHandler = staticFileHandler;
	}

	routeHandler(req, res);

	// ================================================================================================

	function writeHandler(req, res) {
		var bytes = [];
		req.on('data', chunk => {
			bytes.push(chunk)
		});
		req.on('end', () => {
			data = bytes.toString('utf8');
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
		res.writeHead(200, { 'Content-Type': 'text/json' });
		fs.readFile('./storage.txt', function(err, content) {
			if(err) {
				console.log(err);
				res.writeHead(500);
				res.end();
				return;
			}
			res.writeHead(200);
			res.write(content);
			res.end();
		});
	}
	
	function indexHandler(req, res) { 
		req.url = 'index.html'; 
		staticFileHandler(req, res); 
	}

	function staticFileHandler(req, res) {
		//todo: check file exist...
		fs.readFile('./Client/' + req.url, function (err, data) {
			if (err) {
				res.writeHead(500);
				console.error(err);
				res.end('error');
			} else {
				res.writeHead(200);
				res.write(data);
				res.end();
			}
		});
	}
}