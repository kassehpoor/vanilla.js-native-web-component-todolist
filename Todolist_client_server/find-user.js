var fs = require('fs');

exports.findUser = function findUser(userId, cb, errFn) {
    fs.readFile('./users.txt', function (err, result) {
        if (err) {
            console.log(err);
            errFn && errFn(err);
            return;
        }
        var users = JSON.parse(result);
        var user = users.find(u => u.id === userId);
        cb && cb(user ? user : null);
    });
}