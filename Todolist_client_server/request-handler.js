var handlers = require('./request-handlers');

exports.requestHnadler = function requestHnadler(req, res) {
	console.log(req.method, req.url);

	var routeHandler = ({
		'GET': {
			'/': handlers.indexHandler,
			'/read': handlers.readHandler
		},
		'POST': {
			'/write': handlers.writeHandler,
			'/auth': handlers.authHandler,
			'/register': handlers.registerHandler
		},
	})[req.method][req.url];

	(routeHandler || handlers.fileHandler)(req, res);
};