var connection = (function () {
    return {
        download: download,
        upload: upload,
        authenticate: authenticate,
        signout: signout,
        registerUser: registerUser,

        setTokenHeader: setTokenHeader
    };

    function registerUser(fisrtname, lastname, username, password) {
        var data = {
            "username": username,
            "password": password,
            "firstName": fisrtname,
            "lastName": lastname
        }
        return http.post('register', JSON.stringify(data), [{ name: 'Content-Type', value: 'application/json' }])
    }

    function authenticate(username, password) {
        var headers = [
            { name: 'Content-Type', value: 'application/json' },
            { name: 'username', value: username },
            { name: 'password', value: password }
        ];
        return http.post('auth', null, headers);
    }

    function download() {
        return http.get('read', []);
    }

    function upload(data) {
        return http.post('write', JSON.stringify(data), [{ name: 'Content-Type', value: 'application/json' }]);
    }

    function signout() {
        setTokenHeader();
    }

    function setTokenHeader(token) {
        http.setDefaultHeader('token', token);
    }

}())

