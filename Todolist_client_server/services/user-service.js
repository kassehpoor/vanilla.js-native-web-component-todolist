var fs = require('fs');

var filePath = './data/users.txt';

module.exports = {
    findUser: findUser,
    readUsers: readUsers,
    writeData: writeData
}

function findUser(userId, cb, errFn) {
    fs.readFile(filePath, function (err, result) {
        if (err) {
            console.log(err);
            errFn && errFn(err);
            return;
        }
        var allUsers = JSON.parse(result);
        var user = allUsers.find(u => u.id === userId);
        cb && cb(user);
    });
}

function readUsers(cb, errFn) {
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


