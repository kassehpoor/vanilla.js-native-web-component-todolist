
var connection = (function () {
    return {
        init: init,
        download: download,
        upload: upload,
        authenticate: authenticate,
        setTokenHeader: setTokenHeader,
    };

    function init() {
        var token = db.getToken();
        if (!token) return;
        http.setDefaultHeader('Token', token);
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
                setTokenHeader(token);
            }
            cb && cb(user);
        }, err);
    }

    function download(cb, err) {
        http.get('read', [], cb, err);
    }

    function upload(data, cb, err) {
        http.post('write', JSON.stringify(data), [{ name: 'Content-Type', value: 'application/json' }], cb, err);
    }

    function setTokenHeader(token) {
        db.setToken(token);
        http.setDefaultHeader({ name: 'Token', value: token });
    }

}())

