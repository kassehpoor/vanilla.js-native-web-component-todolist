var fs = require('fs');

var filePath = './data/users.txt';

module.exports = {
    findUser: findUser,
    addUser: addUser
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


function addUser(user, cb) {
    readUsers(function (allUsers) {
        user.id = allUsers[allUsers.length - 1].id + 1;
        allUsers.push(user);
        writeUsers(allUsers, function () {
            var addedUser = {id :user.id,firstName:user.firstName,lastName:user.lastName}
            //var addedUser = user;
            cb && cb(addedUser);
        });
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

function writeUsers(allusers, cb, errFn) {
    fs.writeFile(filePath,JSON.stringify(allusers),err =>{
        if (err) {
            console.log(err);
            errFn && errFn(err);
            return;
        }
        cb && cb() 
    });
};


