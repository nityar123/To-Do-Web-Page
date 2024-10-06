const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const editButton = document.createElement('button');


// adding a task
addTaskBtn.addEventListener('click', function () {
    const task = taskInput.value;
    if (task) {
        const li = document.createElement('li');
        li.textContent = task;

        // marking task as complete (strikethrough)
        li.addEventListener('click', function () {
            li.classList.toggle('completed');
        });

        taskList.appendChild(li);
        taskInput.value = ''; // Clear input box
    }
});