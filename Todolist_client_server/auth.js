var fs = require('fs');

exports.authenticate = function (username, password) {
    fs.readFile('./users.txt',function(err,users){
        if (err) {
            console.log(err);
            return;
        }
        var user = users.find(u => u.username === username && u.password === password);
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        }
    } );
}

