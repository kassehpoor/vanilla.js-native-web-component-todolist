var fs = require('fs');

var filePath = './storage.txt';

module.exports = {
	readData: readData,
	writeData: writeData
}

function readData(userId, cb, errFn) {
	fs.readFile(filePath, function (err, content) {
		if (err) {
			console.log(err);
			errFn && errFn(err);
			return;
		}
		var data = JSON.parse(content);
		cb && cb(data);
	});
};

function writeData(data, cb, errFn) {

	fs.writeFile(filePath, JSON.stringify(data), err => {
		if (err) {
			console.log(err);
			errFn && errFn(err);
			return;
		}
		cb && cb();
	});

};