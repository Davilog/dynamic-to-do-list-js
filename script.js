document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Add task when "Add Task" button is clicked
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to add a task to the DOM and optionally save to Local Storage
    function addTask(taskText, save = true) {
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const listItem = document.createElement('li');

        // Add text node for the task text
        const taskTextNode = document.createTextNode(taskText);
        listItem.appendChild(taskTextNode);

        // Create Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // On click, remove from DOM and Local Storage
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        taskInput.value = ''; // Clear input

        // Save task to Local Storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});