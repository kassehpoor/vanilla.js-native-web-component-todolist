var fs = require('fs');

exports.requestHnadler = function requestHnadler(req, res) {
	console.log(req.method, req.url);
//*****************************authentication********************
	/*
	function authenticator () {
		var auth = req.headers ['auth'];
		console.log("Authorization Header is: ", auth);
		if (!auth) {  // No Authorization header was passed in so it's the first time the browser hit us
			 // Sending a 401 will require authentication, we need to send the 'WWW-Authenticate' to tell them the sort of authentication to use
       // Basic auth is quite literally the easiest and least secure, it simply gives back  base64( username + ":" + password ) from the browser
			res.setHeader(401,'WWW-Authenticate', 'Basic realm="Secure Area"');
			res.end ();
		}

		else if(auth) {    // The Authorization was passed in so now we validate it

			var tmp = auth.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part

			var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
			var plain_auth = buf.toString();        // read it back out as a string

			console.log("Decoded Authorization ", plain_auth);

			// At this point plain_auth = "username:password"

			var creds = plain_auth.split(':');      // split on a ':'
			var username = creds[0];
			var password = creds[1];

			if((username == 'hack') && (password == 'thegibson')) {   // Is the username/password correct?

							res.statusCode = 200;  // OK
							res.end('<html><body>Congratulations you just hax0rd teh Gibson!</body></html>');
			}
			else {
							res.statusCode = 401; // Force them to retry authentication
							res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

							// res.statusCode = 403;   // or alternatively just reject them altogether with a 403 Forbidden

							res.end('<html><body>You shall not pass</body></html>');
			}
}

	}
*/

//***************************************************************

	var routeHandler = ({
		'GET': {
			'/': indexHandler,
			'/read': readHandler
		},
		'POST': {
			'/write': writeHandler,
			'/auth' : authenticator
		},
		
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