(function () {
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    .todos-container {
        font-family: sans-serif;
        line-height: 1.4em;
        background: #f5f5f5;
        color: #4d4d4d;
        min-width: 230px;
        max-width: 640px;;
        margin: 0 auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 300;
    }
    </style>
    <div>
        <ul class="todos-container"></ul>
    </div>
    `;

    class TodolistComponent extends HTMLElement {

        constructor() {
            super();

            var me = this;

            me._shadowRoot = this.attachShadow({ 'mode': 'open' });
            me._shadowRoot.appendChild(template.content.cloneNode(true));
            me._todosContainer = this._shadowRoot.querySelector('.todos-container');

        }

        get todos() {
            return this._todos;
        }

        set todos(value) {
            this._todos = value;
            this.render(this._todos || []);
        }

        render(todos) {
            var me = this;
            me._todosContainer.innerHTML = '';
            todos.forEach(function (todo) {
                me._todosContainer.appendChild(me.createTodoElement(todo));
            })

        }

        createTodoElement(todo) {
            var li = document.createElement('li');
            li.className = 'li';
            var titleSpan = document.createElement('span');

            titleSpan.textContent = todo.title;
            titleSpan.className = todo.complete
                ? 'complete'
                : todo.underEdit
                    ? 'editing'
                    : 'active';
            li.appendChild(titleSpan);
            li.appendChild(this.createButtons(todo));

            return li;
        }

        createButtons(todo) {
            var buttonsContainer = document.createElement('div');
            var btnEdit = document.createElement('button');
            var btnComplete = document.createElement('button');
            var btnRemove = document.createElement('button');


            btnEdit.setAttribute("class", "editbtn");
            btnComplete.setAttribute("class", "togbtn");
            btnRemove.setAttribute("class", "delbtn");

            btnEdit.textContent = 'edit';
            btnComplete.textContent = todo.complete ? 'Activate' : 'Complete';
            btnRemove.textContent = 'X';

            if (!todo.complete) buttonsContainer.appendChild(btnEdit);
            buttonsContainer.appendChild(btnComplete);
            buttonsContainer.appendChild(btnRemove);

            btnEdit.onclick = function (e) {

                _submitTodoComp.underEditTodo = todo;
                renderTodos();
            };
            btnComplete.onclick = function () {
                todo.complete = !todo.complete;
                renderTodos();
            };
            btnRemove.onclick = function () {
                _userModel.todos.splice(_userModel.todos.indexOf(todo), 1);
                renderTodos();
            };

            return buttonsContainer;
        }

    }

    window.customElements.define('todo-list', TodolistComponent);

}());

//=======================================================================
