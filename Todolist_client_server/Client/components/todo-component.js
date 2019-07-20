var TodoComponent = (function () {

    var _user = {},
        _userModel = {};
    var _todoListComp, _submitTodoComp, _filterTodosComp;


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
            uploadTodoButton = dom.getElementsByClassName('upload-todo-button')[0];

        _submitTodoComp = dom.getElementsByClassName('submitTodoComp')[0];
        _todoListComp = dom.getElementsByClassName('todoListComp')[0];
        _filterTodosComp = dom.getElementsByClassName('filterTodosComp')[0];

        _submitTodoComp.addEventListener('submit', function (e) {
            var todo = e.detail;
            if (!todo) return;

            !todo.isEditing && _userModel.todos.unshift(todo);

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

            //_userModel.todos.splice(_userModel.todos.indexOf(todo), 1);
            todo.isDeleted = true;
            renderTodos();
        });

        _filterTodosComp.addEventListener('filter', function (e) {
            _userModel.filter = e.detail;
            renderTodos();
        });

        deleteAllTodosButton.onclick = deleteAllTodos;
        downloadTodoButton.onclick = downloadTodos;
        uploadTodoButton.onclick = uploadTodos;

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
                return _userModel.todos.filter(function (t) { if (!t.isDeleted) return t });
            }
            var filtered = _userModel.todos.filter(function (t) {
                if (!t.isDeleted ) return (_userModel.filter === 1) ? !t.isCompleted : t.isCompleted;
            });
            return filtered
        }
    }

    function deleteAllTodos() {
        //_userModel.todos = [];
        _userModel.todos.forEach(function (todo) { todo.isDeleted = true; })
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
                    <filter-todos class= 'filterTodosComp'></filter-todos>
               
            </div>
        `;
    }

}());
