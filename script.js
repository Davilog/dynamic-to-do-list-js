// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Define the addTask function
    function addTask() {
        // Get and trim the task input value
        const taskText = taskInput.value.trim();

        // Alert if input is empty
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new <li> element
        const listItem = document.createElement('li');

        // Add task text as a separate text node
        const taskTextNode = document.createTextNode(taskText);
        listItem.appendChild(taskTextNode);

        // Create a "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Remove task when the button is clicked
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
        };

        // Append the remove button to the task item
        listItem.appendChild(removeButton);

        // Append the task item to the list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';
    }

    // Attach event listener to "Add Task" button
    addButton.addEventListener('click', addTask);

    // Allow task addition via "Enter" key in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});