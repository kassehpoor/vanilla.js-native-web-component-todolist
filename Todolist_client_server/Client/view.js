var view = (function () {
	var todoInput = document.getElementById("todoText");
	var todoListEl = document.getElementById('todoList');
	var appPage = document.getElementById('app');
	var loginPage = document.getElementById('login-page');
	var btnSignin = document.getElementById('btnSignin');
	var spnUserDisplayName = document.getElementById('spnUserDisplayName');
	var usernameInput = document.getElementById('userLogin');
	var passwordInput = document.getElementById('passLogin');
	var btnSignout = document.getElementById('btnSignout');

	init();

	return {
		render: render,
		add: add,
		deleteAll: deleteAll,
		filter: filter,
		download: download,
		upload: upload,
		login: login,
		showApp: showApp,
		showLoginPage: showLoginPage,
		logoff: logoff,
		cancelLogin: cancelLogin
	};

	function render(todos) {
		todoListEl.innerHTML = '';
		todos.forEach(function (todo) {
			todoListEl.appendChild(createLi(todo));
		});
	}

	function filter(value) {
		controller.filterTodos(value);
	}

	function add() {
		var value = todoInput.value;
		if (!value) return;
		controller.addTodo(value);
		todoInput.value = '';
	}

	function deleteAll() {
		controller.removeAllTodos();
	}
	function download() {
		controller.download();
	}

	function upload() {
		controller.upload();
	}

	function login() {
		var username = usernameInput.value;
		var password = passwordInput.value;
		if (!username || !password) return;

		controller.login(username, password);
		usernameInput.value = '';
		passwordInput.value = '';
	}
	function showLoginPage() {
		appPage.style.display = 'none';
		spnUserDisplayName.style.display = 'none';
		loginPage.style.display = 'block';
		btnSignin.style.display = 'none';
	}

	function showApp(user) {
		loginPage.style.display = 'none';
		appPage.style.display = 'block';

		if (user) {
			btnSignin.style.display = 'none';
			spnUserDisplayName.style.display = 'inline-block';
			btnSignout.style.display = 'inline-block';
			spnUserDisplayName.textContent = user.firstName + ' ' + user.lastName;
		} else {
			btnSignin.style.display = 'block';
		}

	};

	function logoff() {
		controller.logoff();
	}

	function cancelLogin() {
		showApp();
	}

	// ====================================================================

	function init() {

	}

	function createLi(todo) {
		var li = document.createElement('li');
		li.className = 'li';
		var titleSpan = document.createElement('span');

		titleSpan.textContent = todo.title;
		titleSpan.className = todo.complete ? 'complete' : 'active';
		li.appendChild(titleSpan);
		li.appendChild(createButtons(todo));

		return li;
	}

	function createButtons(todo) {
		var buttonsContainer = document.createElement('div');
		var btnComplete = document.createElement('button');
		var btnRemove = document.createElement('button');
		btnComplete.setAttribute("class", "togbtn");
		btnRemove.setAttribute("class", "delbtn");


		btnComplete.textContent = todo.complete ? 'Activate' : 'Complete';
		btnRemove.textContent = 'X';

		buttonsContainer.appendChild(btnComplete);
		buttonsContainer.appendChild(btnRemove);

		btnComplete.onclick = function () { controller.toggleComplete(todo) };
		btnRemove.onclick = function () { controller.remove(todo) };

		return buttonsContainer;
	}

}());
