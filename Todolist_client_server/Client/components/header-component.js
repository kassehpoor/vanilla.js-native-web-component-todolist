(function () {
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
        h1 {
            font-family: Arial, sans-serif;
            font-size:70px;
            color: #888888;
            font-weight: normal;
            color:rgb(241, 167, 154);
            text-align: center;
        
        }
        .btn-Signin {
            background-color: rgb(234, 240, 178);
            -webkit-text-fill-color: black; 
            color: white;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            margin: 4px 2px;
            cursor: pointer;
            float :right;
        }
        .btn-Signup {
            background-color: rgb(234, 240, 178);
            -webkit-text-fill-color: black; 
            color: white;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            margin: 4px 2px;
            cursor: pointer;
            float :right;
        }
        .btn-Signout {
            background-color: rgb(234, 240, 178);
            -webkit-text-fill-color: black; 
            color: white;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            margin: 4px 2px;
            cursor: pointer;
            float :right;
        }
    </style>
    <header>
        <h1>todos</h1>
        <div>
            <input type="button" value="Sign in" class="btn-Signin" />
            <input type="button" value="Sign up" class="btn-Signup" />
            <input type="button" value="Sign out" class="btn-Signout" />
        </div>
    </header>
    <span class="spnUserDisplayName"></span>
    `;

    class HeaderComponent extends HTMLElement {

        constructor() {
            super();

            var me = this;

            me._shadowRoot = this.attachShadow({ 'mode': 'open' });
            me._shadowRoot.appendChild(template.content.cloneNode(true));
            me._signinButton = this._shadowRoot.querySelector('.btn-Signin');
            me._signupButton = this._shadowRoot.querySelector('.btn-Signup');
            me._signoutButton = this._shadowRoot.querySelector('.btn-Signout');
            me._currentUserDisplayName = this._shadowRoot.querySelector('.spnUserDisplayName');

            me._signinButton.addEventListener('click', e => {

                this.dispatchEvent(new CustomEvent('signin', {
                    bubbles: true,
                    cancelable: false,
                    composed: true
                }));

            });

            me._signupButton.addEventListener('click', e => {

                this.dispatchEvent(new CustomEvent('signup', {
                    bubbles: true,
                    cancelable: false,
                    composed: true
                }));

            });

            me._signoutButton.addEventListener('click', e => {

                this.dispatchEvent(new CustomEvent('signout', {
                    bubbles: true,
                    cancelable: false,
                    composed: true
                }));

            });

        }

        get displayName() {
            return this.getAttribute('displayname');
        }
        set displayName(value) {
            this.setAttribute('displayname', value);
        }


        static get observedAttributes() {
            return ['displayname'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case 'displayname':
                    this._signinButton.style.display = newValue ? 'none' : 'inline-block';
                    this._signupButton.style.display = newValue ? 'none' : 'inline-block';
                    this._signoutButton.style.display = !newValue ? 'none' : 'inline-block';
                    return this._currentUserDisplayName.textContent = newValue || 'anonymous user';
            }
        }
    }

    window.customElements.define('headr-component', HeaderComponent)

}());