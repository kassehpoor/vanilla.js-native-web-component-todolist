var fs = require('fs');

exports.authenticate = function (username, password) {
    fs.readFile('./users.txt',function(err,data){
        if (err) {
            console.log(err);
            return;
        }
        obj = JSON.parse (data);
        var user = obj.users.find(u => u.username === username && u.password === password);
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        }
    } );
}

