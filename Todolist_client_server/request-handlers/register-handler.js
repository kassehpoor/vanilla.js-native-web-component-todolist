var bodyParser = require('../services/body-parser');
var userService = require('../services/user-service');

module.exports = function registerUser( req, res) {
   console.log('in registerUser function');
      bodyParser.parse(req, function (model) {
         var newUser = model;

         userService.addUser(newUser, function(addedUser){
           var result = addedUser || {};
           res.write(JSON.stringify(result));
           res.end()
         }, function (err) {
            res.writeHead(500);
            res.end('register user failed.'+err);
         });
      });
 }

/*
 function (err) {
   res.writeHead(500);
   res.end(err);
});
*/
