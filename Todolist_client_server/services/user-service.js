var fs = require('fs');

var filePath = './data/users.txt';

module.exports = {
    findUser: findUser,
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
        //cb && cb(null, user);wrong
    });
}


