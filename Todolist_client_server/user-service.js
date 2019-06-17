var fs = require('fs');

var filePath = './users.txt';

module.exports = {
    findUser: findUser,
}


function findUser(userId, cb) {
    fs.readFile(filePath, function (err, result) {
        if (err) {
            console.log(err);
            cb && cb(err);
            return;
        }
        var allUsers = JSON.parse(result);
        var user = allUsers.find(u => u.id === userId);
        cb && cb(null, user);
    });
}