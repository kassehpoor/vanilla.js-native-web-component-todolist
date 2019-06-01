
var connection = (function () {
    return {
        init: init,
        download: download,
        upload: upload,
        authenticate: authenticate,
    };

    function init() {
        var token = db.getToken();
        if (!token) return;
        http.setDefaultHeader({ name: 'Token', value: token });
    }

    function authenticate(username, password, cb, err) {

        var headers = [
            { name: 'Content-Type', value: 'application/json' },
            { name: 'username', value: username },
            { name: 'password', value: password }
        ];
        http.post('auth', null, headers, function (result) {
            if (result) {
                var user = JSON.parse(result);
                var token = user.id;
                db.setToken(token);
                db.setUser(user);
                http.setDefaultHeader({ name: 'Token', value: token });
            }
            cb && cb(user);
        }, err);
    }

    function download(cb, err) {
        http.get('read', [], cb, err);
    }

    function upload(data, cb, err) {
        http.post('write', data, [{ name: 'Content-Type', value: 'application/json' }], cb, err);
    }

}())

