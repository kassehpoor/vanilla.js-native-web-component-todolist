var view = (function () {
	var downloadTodos = document.getElementById("DownloadButton");
	var uploadTodos =document.getElementById("UplodButton");
	var todoText = document.getElementById("todoText");
	var addButton = document.getElementById("addButton");
	var todoListEl = document.getElementById('todoList');
        
	init();

	return {
		render: render
	};

	function render(todos) {
		todoListEl.innerHTML = '';
		todos.forEach(function (todo) {
			todoListEl.appendChild(createLi(todo));
		});
		
	}


	// ====================================================================

	function init() {
		addButton.onclick = function () {
			var value = todoText.value;
			if (!value) return;
			controller.addTodo(value);
			todoText.value = '';
		};
		downloadTodos.onclick =function (){controller.download()} ;
		uploadTodos.onclick = function (){controller.upload()};
		
	}

	function createLi(todo) {
		var li = document.createElement('li');
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

		btnComplete.textContent = todo.complete ? 'Complete' : 'Activate';
		btnRemove.textContent = 'X';

		buttonsContainer.className = 'buttons-container';
		buttonsContainer.appendChild(btnComplete);
		buttonsContainer.appendChild(btnRemove);

		btnComplete.onclick = function () { controller.toggleComplete(todo) };
		btnRemove.onclick = function () { controller.remove(todo) };

		return buttonsContainer;
	}
}());
