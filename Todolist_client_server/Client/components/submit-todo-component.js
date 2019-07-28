(function () {
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
        .todo-input {
    
            display: flex;
            margin: 3px;
            padding: 3px 7px;
            text-decoration: none;
            border: 1px solid transparent;
            border-radius: 3px;
            background-color: transparent;
            border-bottom: solid 1px #cccccc;
            font-size: 25px;
            width: 100%;
        }
        .submit-todo-button {
            background-color: rgb(207, 230, 217);
            -webkit-text-fill-color: black; 
            color: white;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            margin: 4px 2px;
            cursor: pointer;
        }
        .cancel-todo-button {
            background-color: rgb(207, 230, 217);
            -webkit-text-fill-color: black; 
            color: white;
            text-align: center;
            text-decoration: none;
            display:none;
            margin: 4px 2px;
            cursor: pointer;
        }
    </style>
    
    <form class="todo-form">
        <input type="text" placeholder="Enter a new todo..." class="todo-input">
        <input type="submit" value="Submit" class="submit-todo-button">
        <input type="button" value="Cancel" class="cancel-todo-button">
    </form>    
`;
    class SubmitTodoComponent extends HTMLElement {

        constructor() {
            super();

            var me = this;

            me._shadowRoot = this.attachShadow({ 'mode': 'open' });
            me._shadowRoot.appendChild(template.content.cloneNode(true));
            me._todoInput = this._shadowRoot.querySelector('.todo-input');
            me._todoForm = this._shadowRoot.querySelector('.todo-form');
            me._cancleEditButton = this._shadowRoot.querySelector('.cancel-todo-button');
            me._todo = {};

            me._todoForm.addEventListener('submit', function (e) {
                e.preventDefault();
                var value = me._todoInput.value;
                if (!value) return;

                me._todo.title = value;
                me.dispatchEvent(new CustomEvent('submit', {
                    bubbles: true,
                    cancelable: false,
                    composed: true,
                    detail: me._todo
                }));
                
                me._todo = {};
                me._todoInput.value = '';
                me.setCancelButtonDisplay(false);
            });

            me._cancleEditButton.addEventListener('click', e => {
                me.dispatchEvent(new CustomEvent('cancelEdit', {
                    bubbles: true,
                    cancelable: false,
                    composed: true
                }));

                me._todo = {};
                me._todoInput.value = '';
                me.setCancelButtonDisplay(false);
            });

        }

        get value() {
            return this.getAttribute('value');
        }
        set value(val) {
            this.setAttribute('value', val);
        }

        get todo() {
            return this._todo;
        }
        set todo(todo) {
            if (!todo) return;

            this.value = todo.title;
            this._todo = todo;
            this.setCancelButtonDisplay(true);
        }


        static get observedAttributes() {
            return ['value', 'onsubmit'];
        }
        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case 'value':
                    return this._value = this._todoInput.value = newValue;
                case 'onsubmit':
                    return this._onsubmit = newValue;
            }
        }

        setCancelButtonDisplay(val) {
            this._cancleEditButton.style.display = val ? 'inline-block' : 'none';
        }
    }
    window.customElements.define('submit-todo', SubmitTodoComponent);
}());