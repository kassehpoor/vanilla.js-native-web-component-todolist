(function () {
    const template = document.createElement('template');
    template.innerHTML = `
         <style>
            .input {
                display: flex;
                margin: 3px;
                padding: 3px 7px;
                text-decoration: none;
                border: 1px solid transparent;
                border-radius: 3px;
                background-color: transparent;
                border-bottom: solid 1px #cccccc;
            }
            .input{
                display: flex;
                margin: 3px;
                padding: 3px 7px;
                text-decoration: none;
                border: 1px solid transparent;
                border-radius: 3px;
                background-color: transparent;
                border-bottom: solid 1px #cccccc;
            }
            .do-sing-in-button {
                background-color: rgb(207, 230, 217);
                -webkit-text-fill-color: black; 
                margin: 10px;
                color: white;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                margin: 4px 2px;
                cursor: pointer;
            }
            .cancel-sing-in-button {
                background-color: rgb(234, 240, 178);
                -webkit-text-fill-color: black; 
                color: white;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                margin: 4px 2px;
                cursor: pointer;
            }
        </style>

        <div>
            <div>
                <input type="text" placeholder = "username" class = "input  username-input" />
            </div>
            <div>
                <input type="password" placeholder = "password" class = "input  password-input" />
            </div>
            <div>
                <br></br>
                <input type="button" value="Login" class="do-sing-in-button" />
                <input type="button" value="Cancel" class="cancel-sing-in-button" />
            </div>
         </div>
    `;

    class SignInComponent extends HTMLElement {
        constructor() {
            super();

            var me = this;

            me._shadowRoot = this.attachShadow({ 'mode': 'open' });
            me._shadowRoot.appendChild(template.content.cloneNode(true));
            me._usernameInput = this._shadowRoot.querySelector('.username-input');
            me._passwordInput = this._shadowRoot.querySelector('.password-input');
            me._loginButton = this._shadowRoot.querySelector('.do-sing-in-button');
            me._cancelButton = this._shadowRoot.querySelector('.cancel-sing-in-button');

            me._loginButton.addEventListener('click', e => {
                var username = me._usernameInput.value;
                var password = me._passwordInput.value;
                if (!username || !password) return;

                me.login(username, password);

                me._usernameInput.value = '';
                me._passwordInput.value = '';

            });
            me._cancelButton.addEventListener('click', e => {
                me.cancelSingIn(); 

                me._usernameInput.value = '';
                me._passwordInput.value = '';
            });
        }

        login(username, password) {
            connection.authenticate(username, password).then(function (result) {
                if (!result) {
                    return alert('authentication failed.');
                }
                var user = JSON.parse(result);
                App.reInit(user);
                Router.goto('todolist');
            }, function (err) {
                alert(err);
            });
        }

        cancelSingIn() {
            Router.goto('todolist');
        }

    }
    window.customElements.define('signin-component', SignInComponent);
}())




//******************************************************************* */
/*
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

    function cancelSingIn() {
        Router.goto('todolist');
    }


    function login(username, password) {
        connection.authenticate(username, password).then(function (result) {
            if (!result) {
                return alert('authentication failed.');
            }
            var user = JSON.parse(result);
            App.reInit(user);
        }, function (err) {
            alert(err);
        });
    }

    function template() {
        return `
            <div>
                <div>
                    <input type="text" placeholder = "username" class = "username-input" />
                </div>
                <div>
                    <input type="password" placeholder = "password" class = "password-input" />
                </div>
                <div>
                    <br></br>
                    <input type="button" value="Login" class="do-sing-in-button" />
                    <input type="button" value="Cancel" class="cancel-sing-in-button" />
                </div>
            </div>`;
    }
}());
*/