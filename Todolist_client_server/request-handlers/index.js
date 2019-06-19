var writeHandler = require('./write-handler');
var readHandler = require('./read-handler');
var authHandler = require('./auth-handler');
var indexHandler = require('./index-handler');
var fileHandler = require('./file-handler');
var registerHandler = require('./register-handler');

module.exports = {
    writeHandler: writeHandler,
    readHandler: readHandler,
    authHandler: authHandler,
    indexHandler: indexHandler,
    fileHandler: fileHandler,
    registerHandler: registerHandler
};