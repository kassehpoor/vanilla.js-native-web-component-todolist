var controller = (function () {
	var _todos = [];
	var _filter = 0; // 0:all   1:active   2:complete
	var _user = {};

	init();

	return {
		addTodo: addTodo,
		toggleComplete: toggleComplete,
		removeAllTodos: removeAllTodos,
		remove: remove,
		setFilter: setFilter,
		download: download,
		upload: upload,
		filterTodos: filterTodos,
		login: login,
		logoff: logoff
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
		connection.download(function (data) {
			if (!data) return alert('there is nothing on the server to replace client data.');
			var confirmResult = confirm('data on the local storage will be repaced!, are you sure to continue?');
			if (!confirmResult) return;
			db.setModel(JSON.parse(data));
			init();
		}, function (err) {
			alert(err);
		});
	}

	function upload() {
		var data = db.getModel();
		if (!data) return alert('there is nothing to upload.');
		var confirmResult = confirm('data on the server will be replaced!, are you sure to continue?');
		if (!confirmResult) return;
		connection.upload(data, function () {
			alert('upload done successfully.');
		}, function () {
			alert('upload failed ,because of the server problem.');
		});
	}

	function login(username, password) {
		connection.authenticate(username, password, function (user) {
			if (!user) {
				return alert('authentication failed.');
			}
			db.setCurrentUser(user);
			init();
		}, function (err) {
			alert(err);
		});
	}

	function logoff() {
		db.setCurrentUser();
		connection.signout();
		init();
	}

	function filterTodos(value) {
		_filter = value || 0;
		render();
	}


	// ================================================================

	function init() {
		_user = db.getCurrentUser() || { id: 0 };
		connection.init(_user.id);
		view.showApp(_user);

		var model = db.getModel(_user.id) || {};
		_todos = model.todos || [];
		_filter = model.filter || 0;
		render();
	}

	function render() {
		db.setModel(_user.id, { todos: _todos, filter: _filter });
		view.render(getFilteredTodos());
	}

	function getFilteredTodos() {
		//filter ----> 0:all   1:active   2:complete
		if (!_filter) {
			return _todos;
		}
		var filtered = _todos.filter(function (t) {
			return (_filter === 1) ? !t.complete : t.complete;
		});
		return filtered
	}

})();