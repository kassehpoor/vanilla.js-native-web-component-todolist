var TodoComponent = (function () {

    var _user = {},
        _userModel = {};
    var _todoListComp, _submitTodoComp;

    return {
        init: init,
        render: render,
        getCurrentUser: function () { return _user }
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
        _todoListComp = dom.getElementsByClassName('todoListComp')[0];

        _submitTodoComp.addEventListener('submit', function (e) {
            var todo = e.detail;
            if (!todo) return;

            !todo.isEditing && _userModel.todos.push(todo);

            delete todo.isEditing;
            renderTodos();
        });

        _submitTodoComp.addEventListener('cancelEdit', function (e) {
            delete todo.isEditing;
            renderTodos();
        });


        _todoListComp.addEventListener('edit', function (e) {
            if (!e.detail) return;
            var todoUnderEdit = e.detail;
            todoUnderEdit.isEditing = true;
            _submitTodoComp.todo = todoUnderEdit;
            renderTodos();
        });

        _todoListComp.addEventListener('complete', function (e) {
            var todo = e.detail;
            if (!todo) return;

            todo.isCompleted = !todo.isCompleted;
            renderTodos();
        });

        _todoListComp.addEventListener('remove', function (e) {
            var todo = e.detail;
            if (!todo) return;

            _userModel.todos.splice(_userModel.todos.indexOf(todo), 1);
            renderTodos();
        });

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

        _todoListComp.render(getFilteredTodos());

        function getFilteredTodos() {
            //filter ----> 0:all   1:active   2:complete
            if (!_userModel.filter) {
                return _userModel.todos;
            }
            var filtered = _userModel.todos.filter(function (t) {
                return (_userModel.filter === 1) ? !t.isCompleted : t.isCompleted;
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


    // function createTodoElement(todo) {
    //     var li = document.createElement('li');
    //     li.className = 'li';
    //     var titleSpan = document.createElement('span');

    //     titleSpan.textContent = todo.title;
    //     titleSpan.className = todo.complete
    //         ? 'complete'
    //         : todo.underEdit
    //             ? 'editing'
    //             : 'active';
    //     li.appendChild(titleSpan);
    //     li.appendChild(createButtons(todo));

    //     return li;
    // }

    // function createButtons(todo) {
    //     var buttonsContainer = document.createElement('div');
    //     var btnEdit = document.createElement('button');
    //     var btnComplete = document.createElement('button');
    //     var btnRemove = document.createElement('button');


    //     btnEdit.setAttribute("class", "editbtn");
    //     btnComplete.setAttribute("class", "togbtn");
    //     btnRemove.setAttribute("class", "delbtn");

    //     btnEdit.textContent = 'edit';
    //     btnComplete.textContent = todo.complete ? 'Activate' : 'Complete';
    //     btnRemove.textContent = 'X';

    //     if (!todo.complete) buttonsContainer.appendChild(btnEdit);
    //     buttonsContainer.appendChild(btnComplete);
    //     buttonsContainer.appendChild(btnRemove);

    //     btnEdit.onclick = function (e) {

    //         _submitTodoComp.underEditTodo = todo;
    //         renderTodos();
    //     };
    //     btnComplete.onclick = function () {
    //         todo.complete = !todo.complete;
    //         renderTodos();
    //     };
    //     btnRemove.onclick = function () {
    //         _userModel.todos.splice(_userModel.todos.indexOf(todo), 1);
    //         renderTodos();
    //     };

    //     return buttonsContainer;
    // }

    function template() {
        return `
            <div>
                <div class="entries">

                <submit-todo class='submitTodoComp'></submit-todo>

                    <div class="list-of-todos">

                        <input class="delete-all-todos-button" type="button" value="X All">
                        <input class="serverbtns download-todo-button" type="button" value="Download">
                        <input class="serverbtns upload-todo-button" type="button" value="Upload">
                    </div>

                    <div>
                    <todo-list class='todoListComp'></todo-list>
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
