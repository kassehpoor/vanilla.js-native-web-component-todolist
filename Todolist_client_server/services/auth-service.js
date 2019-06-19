var fs = require('fs');
var filePath = './data/users.txt';

exports.authenticate = function (username, password, cb, errFn) {
    fs.readFile(filePath, function (err, data) {
        if (err) {
            console.log(err);
            errFn && errFn(err);
            return;
        }

        var allUsers = JSON.parse(data);
        var user = allUsers.find(u => u.username === username && u.password === password);
        cb && cb(user
            ? {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            }
            : null);
    });

}

