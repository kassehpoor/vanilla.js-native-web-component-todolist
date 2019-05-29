
var connection = (function () {
    return {
        download: download,
        upload: upload,
        authenticate: authenticate,
    };

    function authenticate(username, password, cb, err) {
        http.post('auth', { username: username, password: password }, function (token) {
            if (token) {
                db.setToken(token);
                http.setDefaultHeader({ name: 'Token', value: token });
            }
            cb && cb(toekn);
        }, err);
    }

    function download(cb, err) {
        http.get('read', [], cb, err);
    }

    function upload(data, cb, err) {
        http.post('write', data, { name: 'Content-Type', value: 'application/json' }, cb, err);
    }

}())

