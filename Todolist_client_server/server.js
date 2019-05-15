var http = require('http');
var fs = require('fs');

const port = 3030;


var server = http.createServer(function (req, res) {
	console.log(req.method, req.url,__dirname);

	if (req.method === 'GET'){//***************Get *****************************
		if (req.url === '/') {
			fs.readFile('./Client/index.html', function (err, pageData) {
				if (err){
					res.writeHead(500);
					return res.end('Error loading index.html');
				}else {
					res.writeHead(200, { 'Content-Type': 'text/html' });
					res.write(pageData)
					res.end();
				}
			});
		}
		else {
			fs.readFile('./Client/'+req.url, function (err, pageData) {
				if (err){
					res.writeHead(500);
					return res.end('Error loading index.html');
				}else {
					res.writeHead(200);
					res.write(pageData)
					res.end();
				}
			});
		}
	}//**************************************** end of Get**********************
	else if (req.method === 'POST'){//****************** *post******************
		if (req.url === '/write/') {
			var data = [];
			req.on('data', chunk => {
				data.push(chunk)
			});
			req.on('end', () => {
				var obj = JSON.parse(data);
				fs.appendFile('storage.txt', obj.value, (err) => {
					if (err) console.log(err);
					console.log('successfully written to storage.txt file !');
					res.end();
				});
			});
		} else if (req.method === 'GET' && req.url === '/read/') {
			fs.createReadStream(__dirname+'storage.txt').pipe(res);
		 } else { 
			 res.end(); 
		};
	}else{res.end();};//*************************************end of post*********
}
);
server.listen(port);
server.on('listening', function () {
	console.log('Listenning on port ' + port);
});

















//---------------------------------------------------------------
/*
var request = require('request');

var server = http.createServer(function (req, res) {
	console.log(req.method, req.url);
});
server.listen(port);
server.on('listening', function () {
	console.log('Listenning on port ' + port);
});

request('/read/',function(error,response,body){
	if (!error && response.statusCode ===200){console.log(body);};
});
*/
//---------------------------------------------------------------

