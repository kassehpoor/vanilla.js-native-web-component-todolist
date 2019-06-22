var bodyParser = require('../services/body-parser');
var userService = require('../services/user-service');

module.exports = function registerUser(req, res) {
   console.log('in registerUser function');
   userService.readUsers(function (allUsers) {

      bodyParser.parse(req, function (model) {
         var newUser = model;
         newUser.id = allUsers[allUsers.length - 1].id + 1;
         allUsers.push(newUser);

         userService.writeData(allUsers, function () {
            console.log('registerUser() done successfully.');
            res.writeHead(200);
            res.end();
         }, function (err) {
            res.writeHead(500);
            res.end('register user failed.'+err);
         });

      });
   }, function (err) {
      res.writeHead(500);
      res.end(err);
   });

}