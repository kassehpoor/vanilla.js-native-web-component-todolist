var auth = require('../auth');

module.exports = function authHandler(req, res) {

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