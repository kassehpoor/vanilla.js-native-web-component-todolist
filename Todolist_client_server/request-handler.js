var fs = require('fs');
var auth = require('basic-auth');
var compare = require('tsscmp');

exports.requestHnadler = function requestHnadler(req, res) {
	console.log(req.method, req.url);
//***************************************************************
	var credentials = auth(req);

	//check credentials
	//The "check" function will typically be against your user store
	if (req.headers.authorization) !== '' &&){}

	if (!credential || !check(credentials.name,credentials.pass)) {
		res.statusCode = 401;
		res.setHeader('WWW-Authenticate', 'Basic realm="example"');
        res.end('Access denied');
      } else {
        res.end('Access granted');
      }

	  //Basic function to validate credentials for example
	  function check (name, pass) {
		  var valid = true;

		  //simple method to prevent short-circut and use timing-safe compare
		  valid = compare(name, 'tahereh') && valid;
		  valid = compare (pass, 'kasehpoor') && valid;

		  return valid;
	  }
//***************************************************************

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
		fs.readFile('./Client/' + req.url, function (err, data) {
			if (err) {
				res.writeHead(500);
				console.error(err+'problem.............');
				res.end('error');
			} else {
				res.writeHead(200);
				res.write(data);
				res.end();
			}
		});
	}
}