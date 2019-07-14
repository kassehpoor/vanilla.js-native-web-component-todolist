var TodoComponent = (function () {

    var _user = {},
        _userModel = {};
    var _todosContainer, _submitTodoComp, _currentUserDisplayName;

    return {
        init: init,
        render: render
    };

    function init() {
        App.loadUser();
        _user = App.user;
        _userModel = db.getModel(_user.id) || { todos: [], filter: 0 };
        render();
    }

    function render() {

        var dom = App.parseHtml(template()),

            deleteAllTodosButton = dom.getElementsByClassName('delete-all-todos-button')[0],
            downloadTodoButton = dom.getElementsByClassName('download-todo-button')[0],
            uploadTodoButton = dom.getElementsByClassName('upload-todo-button')[0],
            filterAllButton = dom.getElementsByClassName('filter-all-button')[0],
            filterActiveButton = dom.getElementsByClassName('filter-active-button')[0],
            filterCompleteButton = dom.getElementsByClassName('filter-complete-button')[0];


        _submitTodoComp = dom.getElementsByClassName('submitTodoComp')[0];
        _submitTodoComp.addEventListener('submit', function (e) {
            if (!e.detail) {
                _submitTodoComp.value && _userModel.todos.push({ title: _submitTodoComp.value, complete: false });
            }
            renderTodos();
            _submitTodoComp.value = '';
        });
        _submitTodoComp.addEventListener('cancelEdit', function (e) {
            renderTodos();
        });

        _todosContainer = dom.getElementsByClassName('todos-container')[0];

        _currentUserDisplayName = dom.getElementsByClassName('spnUserDisplayName')[0];

        _currentUserDisplayName.textContent = (_user.id !== 0) ? _user.firstName + ' ' + _user.lastName : 'anonymous user';
        deleteAllTodosButton.onclick = deleteAllTodos;
        downloadTodoButton.onclick = downloadTodos;
        uploadTodoButton.onclick = uploadTodos;
        filterAllButton.onclick = filter.bind(null, 0);
        filterActiveButton.onclick = filter.bind(null, 1);
        filterCompleteButton.onclick = filter.bind(null, 2);

        renderTodos();

        return dom;
    }

    // ===============================================================================================

    function renderTodos() {
        db.setModel(_user.id, _userModel);

        _todosContainer.innerHTML = '';
        getFilteredTodos().forEach(function (todo) {
            _todosContainer.appendChild(createTodoElement(todo));
        });

        function getFilteredTodos() {
            //filter ----> 0:all   1:active   2:complete
            if (!_userModel.filter) {
                return _userModel.todos;
            }
            var filtered = _userModel.todos.filter(function (t) {
                return (_userModel.filter === 1) ? !t.complete : t.complete;
            });
            return filtered
        }
    }

    function deleteAllTodos() {
        _userModel.todos = [];
        renderTodos();
    }

    function downloadTodos() {
        connection.download().then(function (data) {
            if (!data) return alert('there is nothing on the server to replace client data.');
            var confirmResult = confirm('data on the local storage will be repaced!, are you sure to continue?');
            if (!confirmResult) return;
            _userModel = JSON.parse(data);
            App.loadUser();
            renderTodos();
        }, function (err) {
            alert(err);
        });
    }

    function uploadTodos() {
        var data = db.getModel(_user.id);
        console.log('data to upload is :' + data);
        if (!data) return alert('there is nothing to upload.');
        var confirmResult = confirm('data on the server will be replaced!, are you sure to continue?');
        if (!confirmResult) return;
        connection.upload(data).then(function () {
            alert('upload done successfully.');
        }, function () {
            alert('upload failed !!!');
        });
    }

    function filter(value) {
        _userModel.filter = value || 0;
        renderTodos();
    }


    function createTodoElement(todo) {
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
        li.appendChild(createButtons(todo));

        return li;
    }

    function createButtons(todo) {
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

        buttonsContainer.appendChild(btnEdit);
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

    function template() {
        return `
            <div>
                <span class="spnUserDisplayName"></span>
                <div class="entries">

                <submit-todo class = 'submitTodoComp'></submit-todo>

                    <div class="list-of-todos">

                        <input class="delete-all-todos-button" type="button" value="X All">
                        <input class="serverbtns download-todo-button" type="button" value="Download">
                        <input class="serverbtns upload-todo-button" type="button" value="Upload">
                    </div>
                    <div>
                        <ul class="todos-container"></ul>
                    </div>
                </div>
                <div>
                    <ul>
                        <input class="filters filter-all-button" type="button" value="All">
                        <input class="filters filter-active-button" type="button" value="Active">
                        <input class="filters filter-complete-button" type="button" value="Complete">
                    </ul>
                </div>
            </div>
        `;
    }


}());

/*************************************************
_submitTodoComp.addEventListener('submit', function (e) {
    //addTodo(_todoInput.value)
    addTodo(e.detail)
    //addTodo(_todoInput.getAttribute('value'))
});
*/