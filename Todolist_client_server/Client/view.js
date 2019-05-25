var view = (function () {
	var todoInput = document.getElementById("todoText");
	var todoListEl = document.getElementById('todoList');
	
	init();

	return {
		render: render,
		add: add,
		deleteAll: deleteAll,
		filter: filter,
		download :download,
		upload : upload,
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
	function download () {
		controller.download();
	}

	function upload () {
		controller.upload();
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
