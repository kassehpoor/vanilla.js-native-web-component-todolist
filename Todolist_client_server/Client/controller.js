var controller = (function () {
	var _todos = [];
	var _filter = 0; // 0:all   1:active   2:complete
	
	init();

	return {
		addTodo: addTodo,
		toggleComplete: toggleComplete,
		removeAllTodos: removeAllTodos,
		remove: remove,
		setFilter: setFilter,
		download :download,
		upload : upload,
		filterTodos :filterTodos,
	};

	function addTodo(value) {
		_todos.push({ title: value, complete: false });
		render();
	}

	function toggleComplete(todo) {
		todo.complete = !todo.complete;
		render();
	}

	function remove(todo) {
		_todos.splice(_todos.indexOf(todo), 1);
		render();
	}

	function removeAllTodos() {
		_todos = [];
		render();
	}

	function setFilter(value) {
		_filter = value;
		render();
	}

	function download() {
		var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = xhr.responseText;
				console.log('download result:', data);
				if (!data) return alert('there is nothing on the server to download.');
				var confirmResult = confirm('data on the local storage will be repaced!,are you sure to continue?');
				if (!confirmResult) return;
				db.setModel(JSON.parse(data));
				init();
            }
        };
        xhr.open('GET', 'read', true);
		xhr.send();
	}

	function upload() {
		var data =  db.getModel();
		if (!data) return alert('there is nothing to upload.');

		var confirmResult = confirm('data on the server will be replaced!, are you sure to continue?');
		if (!confirmResult) return;
		
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                alert('upload done successfully.');
            }
        }
        xhr.open('POST', 'write', true);
        xhr.setRequestHeader('Content-Type','application/json');
		xhr.send(JSON.stringify(data));
		
	}

	function filterTodos(value) {
		_filter = value || 0;
		render();
	}


	// ================================================================

	function init() {
		var model = db.getModel() || { todos: [], filter: 0 };
		_todos = model.todos;
		_filter = model.filter;
		render();
	}

	function render() {
		db.setModel({ todos: _todos, filter: _filter });
		view.render(getFilteredTodos());
	}

	function getFilteredTodos() {
		//filter ----> 0:all   1:active   2:complete
		if (!_filter) {
			return _todos;
		}
		return _todos.filter(function (t) {
			return (_filter === 1) ? !t.complete : t.complete;
		});
	}
 
})();