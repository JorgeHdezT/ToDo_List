document.addEventListener('DOMContentLoaded', function () {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskForm = document.getElementById('taskForm');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', function () {
        taskForm.classList.toggle('hidden');
    });

    saveTaskBtn.addEventListener('click', function () {
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const date = document.getElementById('taskDate').value;

        if (title && description && date) {
            const task = { title, description, date, completed: false };
            saveTask(task);
            displayTasks();
            taskForm.classList.add('hidden');
            clearForm();
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function displayTasks() {
        taskList.innerHTML = '';
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        tasks.forEach(function (task, index) {
            const li = document.createElement('li');
            li.className = 'task';
            if (task.completed) {
                li.classList.add('completed');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', function () {
                tasks[index].completed = !tasks[index].completed;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                displayTasks();
            });

            const titleSpan = document.createElement('span');
            titleSpan.textContent = task.title;

            const dateSpan = document.createElement('span');
            dateSpan.textContent = task.date;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.addEventListener('click', function () {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                displayTasks();
            });

            li.appendChild(checkbox);
            li.appendChild(titleSpan);
            li.appendChild(dateSpan);
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });
    }

    function clearForm() {
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskDate').value = '';
    }

    displayTasks();
});
