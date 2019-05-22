var view = (function () {
	var downloadTodos = document.getElementById("DownloadButton");
	var uploadTodos =document.getElementById("UplodButton");
	var todoText = document.getElementById("todoText");
	var addButton = document.getElementById("addButton");
	var todoListEl = document.getElementById('todoList');
	var filterAllbtn =  document.getElementById('filterAll');
	var filterActivebtn =  document.getElementById('filterActive');
	var filterCompletebtn =  document.getElementById('filterComplete');
	
	
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
		filterAllbtn.onclick = function (){render(controller.filterTodos())};
		filterActivebtn.onclick = function (){render(controller.filterTodos())};
		filterCompletebtn.onclick = function (){render(controller.filterTodos())};
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
	
		btnComplete.textContent = todo.complete ? 'Activate' : 'Complete';
		btnRemove.textContent = 'X';

		buttonsContainer.className = 'buttons-container';
		buttonsContainer.appendChild(btnComplete);
		buttonsContainer.appendChild(btnRemove);

		btnComplete.onclick = function () { controller.toggleComplete(todo) };
		btnRemove.onclick = function () { controller.remove(todo) };

		return buttonsContainer;
	}
		
}());
