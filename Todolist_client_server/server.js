var http = require('http');
var fs = require('fs');

const port = 7070;


var server = http.createServer(function (req, res) {
	console.log(req.method, req.url);
	
//--------------------------------------------------------------------------------
	if (req.method === 'GET'){
		if (req.url === '/') {
			fs.readFile(__dirname+'/index.html', function (err, pageData) {
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
			fs.readFile(__dirname+req.url, function (err, pageData) {
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
	}
	else if (req.method === 'POST'){
		if (req.url === '/write/'){
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
		}
	}
}

	// //----------------------------------------------------------------------------- 
	// if (req.method === 'POST' && req.url === '/write/') {
	// 	var data = [];
	// 	req.on('data', chunk => {
	// 		data.push(chunk)
	// 	});
	// 	req.on('end', () => {
	// 		var obj = JSON.parse(data);
	// 		fs.appendFile('storage.txt',obj.value,(err) =>{
	// 			if (err) console.log(err);
	// 			console.log('successfully written to storage.txt file !');
	// 			res.end();
	// 		});
	// 	});
	// } else if (req.method === 'GET' && req.url === '/read/'){
	// 		fs.createReadStream(__dirname+'storage.txt').pipe(res);
	// 		res.end();
	// } else {
	// 	res.end();
	// }
	//------------------------------------------------------------------------------
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

