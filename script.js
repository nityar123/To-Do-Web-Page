const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const dueDateInput = document.getElementById('dueDateInput');

// Adding a task
addTaskBtn.addEventListener('click', function () {
    const task = taskInput.value;
    const dueDate = dueDateInput.value;

    if (task) {
        const taskObj = {
            text: task,
            dueDate: dueDate,
        };
        
        addTaskToDOM(taskObj);
        saveTaskToLocalStorage(taskObj);

        taskInput.value = ''; // Clear input box
        dueDateInput.value = ''; // Clear due date
    }
});

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

// Add task to the DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.text;

     // Add strikethrough functionality
     li.addEventListener('click', function () {
        li.style.textDecoration = li.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    });

    if (task.dueDate) {
        const dueDateSpan = document.createElement('span');
        dueDateSpan.textContent = ` (Due: ${task.dueDate})`;
        dueDateSpan.style.fontSize = '0.8em';
        dueDateSpan.style.color = 'gray';
        li.appendChild(dueDateSpan);
    }

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn'; // Add a class for styling
    deleteButton.onclick = function() {
        taskList.removeChild(li); // Remove the task from the DOM
        removeTaskFromLocalStorage(task); // Pass the whole task object
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Save task to local storage
function saveTaskToLocalStorage(taskObj) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Filter out the task to be removed using the whole object comparison
    tasks = tasks.filter(task => task.text !== taskToRemove.text || task.dueDate !== taskToRemove.dueDate);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks when the page loads
window.onload = loadTasks;
