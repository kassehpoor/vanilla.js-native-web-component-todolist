module.exports = {
    parse: function bodyParser(req, cb) {
        var bytes = [];
        req.on('data', chunk => {
            bytes.push(chunk)
        });
        req.on('end', () => {
            var value = bytes.toString('utf8');
            var body = JSON.parse(value);
            cb && cb(body);
        });
    }
}