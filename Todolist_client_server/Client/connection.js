
var connection = (function () {
    return {
        init: init,
        download: download,
        upload: upload,
        authenticate: authenticate,
        signout: signout,
    };

    function init() {
        var user = db.getUser();
        if (user) {
            setTokenHeader(user.id);
        }
        return user;
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
                db.setUser(user);
                setTokenHeader(user.id);
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

    function signout() {
        db.setUser();
        setTokenHeader();
    }

    // ========================================================================================================================

    function setTokenHeader(token) {
        http.setDefaultHeader({ name: 'Token', value: token });
    }

}())

