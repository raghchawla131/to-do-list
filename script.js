const myTasks = [];
const addButton = document.querySelector("#input-btn");
const input = document.querySelector("#input-task");
const unorderedList = document.querySelector("#task-list");
const listItems = document.querySelectorAll("li");

let localStorageTasks = JSON.parse(localStorage.getItem('myTasks'));
if(localStorageTasks) {
    for(let i=0; i<localStorageTasks.length; i++) {
        myTasks.push(localStorageTasks[i]);
    }
    renderTasks(myTasks);
}

function addTask() {
    if(input.value) {
        myTasks.push(input.value);
        localStorage.setItem('myTasks', JSON.stringify(myTasks));
        renderTasks(myTasks);
    }
}

function removeFromLocalStorage(taskText) {
    const existingTask = JSON.parse(localStorage.getItem('myTasks'));
    const updatedTasks = existingTask.filter((task) => task != taskText);
    localStorage.setItem('myTasks', JSON.stringify(updatedTasks));
}

function markAsDone() {
    this.classList.toggle("checked");
    this.classList.toggle("unchecked");
    if(this.classList.contains("checked")) {
        removeFromLocalStorage(this.textContent);
    }
}

addButton.addEventListener("click", addTask);

function renderTasks(tasks) {
    unorderedList.innerHTML = "";
    for(let i=0; i<tasks.length; i++) {
        const task = document.createElement("li");
        task.classList.add("unchecked");
        task.textContent = tasks[i];
        task.addEventListener("click", markAsDone);
        unorderedList.append(task);
    }
}
