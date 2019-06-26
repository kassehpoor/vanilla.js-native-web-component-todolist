var SignUpComponent = (function () {

    var _fisrtnameInput, _lastnameInput, _usernameInput, _passwordInput

    return {
        init: init,
        render: render
    };

    function init() {

    }

    function render() {
        var dom = App.parseHtml(template()),
            btnDo =  dom.getElementsByClassName('do-sing-up-button')[0],
            btnCancel =  dom.getElementsByClassName('cancel-sing-up-button')[0];

            _fisrtnameInput = dom.getElementsByClassName('fisrtname-input')[0];
            _lastnameInput = dom.getElementsByClassName('lastname-input')[0];
            _usernameInput = dom.getElementsByClassName('username-input')[0];
            _passwordInput = dom.getElementsByClassName('password-input')[0];

            btnDo.onclick = doSignup;
            btnCancel.onclick = cancelSignup;

        return dom;
    }


    //=============================================================================================

    function doSignup() {
        var fisrtname = _fisrtnameInput.value;
        var lastname = _lastnameInput.value;
        var username = _usernameInput.value;
        var password = _passwordInput.value;
        if (!fisrtname || !lastname || !username || !password) return;

       register(fisrtname, lastname, username, password);
       _fisrtnameInput.value = '';
       _lastnameInput.value = '';
       _usernameInput.value = '';
       _passwordInput.value = '';
    }


    function register(fisrtname, lastname, username, password) {
        connection.registerUser(fisrtname, lastname, username, password).then( function (user) {
            if (!user) {
                return alert('register failed.');
            }
            alert('register done successfuly for  ' + user.firstName + ' ' + user.lastName);
            connection.setTokenHeader(user.id);
            db.setCurrentUser(user);
            //init();
            Router.goto('todolist');
        }, function (err) {
            alert(err);
        });
    }


    function cancelSignup() {
        Router.goto('todolist');
    }


    function template() {
        return `
        <div>
            <div>
                <input type="text" placeholder="fisrtname" class="fisrtname-input"  />
            </div>
            <div>
                <input type="text" placeholder="lastname" class="lastname-input" />
            </div>
            <div>
                <input type="text" placeholder="username" class="username-input"  />
            </div>
            <div>
               <input type="text" placeholder="password" class="password-input" />
            </div>
             <div>
            <br></br>
                <input type="button" value="submit" class="do-sing-up-button"  />
                <input type="button" value="Cancel" class="cancel-sing-up-button" />
             </div>
        </div> `;

    }

}()); 