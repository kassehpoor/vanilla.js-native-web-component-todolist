var fs = require('fs');

module.exports = function fileHandler(req, res) {
    fs.readFile('./Client/' + req.url, function (err, data) {
        if (err) {
            res.writeHead(500);
            console.error(err + 'problem.............');
            res.end('error');
            return;
        }
        res.writeHead(200);
        res.write(data);
        res.end();
    });
}