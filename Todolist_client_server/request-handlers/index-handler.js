var fileHandler = require('./file-handler');

module.exports = function indexHandler(req, res) {
	req.url = 'index.html';
	fileHandler(req, res);
}

