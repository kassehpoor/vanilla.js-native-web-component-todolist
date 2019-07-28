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
            .do-sing-up-button{
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
            .cancel-sing-up-button {
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
                <input type="text" placeholder="fisrtname" class="input  fisrtname-input"  />
            </div>
            <div>
                <input type="text" placeholder="lastname" class="input  lastname-input" />
            </div>
            <div>
                <input type="text" placeholder="username" class="input  username-input"  />
            </div>
            <div>
                 <input type="text" placeholder="password" class="input  password-input" />
            </div>
            <div>
                <br></br>
                <input type="button" value="submit" class="do-sing-up-button"  />
                <input type="button" value="Cancel" class="cancel-sing-up-button" />
            </div>
         </div>
    `;

    class SignUpComponent extends HTMLElement {
        constructor() {
            super();

            var me = this;

            me._shadowRoot = this.attachShadow({ 'mode': 'open' });
            me._shadowRoot.appendChild(template.content.cloneNode(true));
            me._firstnameInput = this._shadowRoot.querySelector('.fisrtname-input');
            me._lastnameInput = this._shadowRoot.querySelector('.lastname-input');
            me._usernameInput = this._shadowRoot.querySelector('.username-input');
            me._passwordInput = this._shadowRoot.querySelector('.password-input');
            me._submitButton = this._shadowRoot.querySelector('.do-sing-up-button');
            me._cancelButton = this._shadowRoot.querySelector('.cancel-sing-up-button');

            me._submitButton.addEventListener('click', e => {
                var firstname = me._firstnameInput.value;
                var lastname = me._lastnameInput.value;
                var username = me._usernameInput.value;
                var password = me._passwordInput.value;
                if (!username || !password || !firstname ||!lastname) return;
                me.register(firstname, lastname, username, password);

                me._firstnameInput.value = '';
                me._lastnameInput.value = '';
                me._usernameInput.value = '';
                me._passwordInput.value = '';

            });
            me._cancelButton.addEventListener('click', e => {
                me.cancelSignup();

                me._firstnameInput.value = '';
                me._lastnameInput.value = '';
                me._usernameInput.value = '';
                me._passwordInput.value = '';

            });
        }

        register(fisrtname, lastname, username, password) {
            connection.registerUser(fisrtname, lastname, username, password).then(function (result) {
                if (!result) {
                    return alert('register failed.');
                }
                var user = JSON.parse(result);
                alert('register done successfuly for  ' + user.firstName + ' ' + user.lastName);
                App.reInit(user);
                Router.goto('todolist');
            }, function (err) {
                alert(err);
            });
        }

        cancelSignup() {
            Router.goto('todolist');
        }
    }
    window.customElements.define('signup-component', SignUpComponent);
}())

//************************************************************************ */
/*
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
        connection.registerUser(fisrtname, lastname, username, password).then( function (result) {
            if (!result) {
                return alert('register failed.');
            }
            var user = JSON.parse(result);
            alert('register done successfuly for  ' + user.firstName + ' ' + user.lastName);
            App.reInit(user);
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
*/