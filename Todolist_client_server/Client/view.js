var view = (function () {
	var todoInput = document.getElementById("todoText");
	var todoListEl = document.getElementById('todoList');
	var appPage = document.getElementById('app');
	var loginPage = document.getElementById('login-page');
	var btnSignin = document.getElementById('btnSignin');
	var usernameInput = document.getElementById('userLogin');
	var passwordInput = document.getElementById('passLogin');

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
		showLoginPage :showLoginPage,
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
		loginPage.setAttribute('style','display:block');
		btnSignin.setAttribute('style','display:none');
	}

	function showApp() {
		appPage.setAttribute('style','display:block');
	};

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
