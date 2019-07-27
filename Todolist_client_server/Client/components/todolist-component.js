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
    .delbtn {
        background-color: #f1eded;
        -webkit-text-fill-color: red; 
        border: none;
        color: white;
        padding: 20px;
        text-align: center;
        text-decoration: none;
        display: inline;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 8px;
      }
      .togbtn {
        background-color:  #f1eded;
        -webkit-text-fill-color: black; 
        border: none;
        color: white;
        padding: 20px;
        text-align: center;
        text-decoration: none;
        display: inline;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 8px;
      }
      .editbtn {
        background-color:  #f1eded;
        -webkit-text-fill-color: black; 
        border: none;
        color: white;
        padding: 20px;
        text-align: center;
        text-decoration: none;
        display: inline;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 8px;
      }
      .complete {
        text-decoration: line-through;
        font-style: italic;
        color: rgb(97, 133, 116);
        text-decoration: line-through;
     }
    
     .active {
        color: black;
     }
    
     .editing {
        color: red;
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

        get value () {
            return Date.now();
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
                titleSpan.className = todo.isCompleted
                    ? 'complete'
                    : todo.isEditing
                        ? 'editing'
                        : 'active';
                li.appendChild(titleSpan);
                li.appendChild(this.createButtons(todo));
    
                return li;
            }
    
            createButtons(todo) {
                var me = this;
    
                var buttonsContainer = document.createElement('div');
                var btnEdit = document.createElement('button');
                var btnComplete = document.createElement('button');
                var btnRemove = document.createElement('button');
    
    
                btnEdit.setAttribute("class", "editbtn");
                btnComplete.setAttribute("class", "togbtn");
                btnRemove.setAttribute("class", "delbtn");
    
                btnEdit.textContent = 'edit';
                btnComplete.textContent = todo.isCompleted ? 'Activate' : 'Complete';
                btnRemove.textContent = 'X';
    
                !todo.isCompleted && buttonsContainer.appendChild(btnEdit);
                buttonsContainer.appendChild(btnComplete);
                buttonsContainer.appendChild(btnRemove);
    
                !todo.isCompleted && btnEdit.addEventListener('click', function (e) {
                    me.dispatchEvent(new CustomEvent('edit', {
                        bubbles: true,
                        cancelable: false,
                        composed: true,
                        detail: todo
                    }));
                });
    
                btnComplete.addEventListener('click', function (e) {
                    me.dispatchEvent(new CustomEvent('complete', {
                        bubbles: true,
                        cancelable: false,
                        composed: true,
                        detail: todo
                    }));
                });
    
                btnRemove.addEventListener('click', function (e) {
                    me.dispatchEvent(new CustomEvent('remove', {
                        bubbles: true,
                        cancelable: false,
                        composed: true,
                        detail: todo
                    }));
                });
    
                return buttonsContainer;
            }

    }

    window.customElements.define('todo-list', TodolistComponent);

}());

