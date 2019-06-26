var SignInComponent = (function () {

    var _usernameInput, _passwordInput

    return {
        init: init,
        render: render
    };

    function init() {

    }

    function render() {
        var dom = App.parseHtml(template()),
            btnDo = dom.getElementsByClassName('do-sing-in-button')[0],
            btnCancel = dom.getElementsByClassName('cancel-sing-in-button')[0];

        _usernameInput = dom.getElementsByClassName('username-input')[0];
        _passwordInput = dom.getElementsByClassName('password-input')[0];

        btnDo.onclick = doSignIn;
        btnCancel.onclick = cancelSingIn;

        return dom;
    }

    // ==============================================================================

    function doSignIn(e) {
        var username = _usernameInput.value;
        var password = _passwordInput.value;
        if (!username || !password) return;

        login(username, password);
        _usernameInput.value = '';
        _passwordInput.value = '';
    }

    function cancelSingIn(e) {
        Router.goto('todolist');
    }


    function login(username, password) {
        connection.authenticate(username, password).then(function (result) {
            if (!result) {
                return alert('authentication failed.');
            }
            var user = JSON.parse(result);
            connection.setTokenHeader(user.id);
            db.setCurrentUser(user);
            // init();
             Router.goto('todolist');
        }, function (err) {
            alert(err);
        });
    }

    function template() {
        return `
            <div>
                <div>
                    <input type="text" placeholder="username" class="userLogin username-input" />
                </div>
                <div>
                    <input type="password" placeholder="password" class="passLogin password-input" />
                </div>
                <div>
                    <br></br>
                    <input type="button" value="Login" class="do-sing-in-button" />
                    <input type="button" value="Cancel" class="cancel-sing-in-button" />
                </div>
            </div>`;
    }
}());