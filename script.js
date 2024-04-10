/* const inputBox = document.getElementById("input-box");*/
const listContainer = document.getElementById("list"); 
const todoForm = document.querySelector(".todo-form");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//function addTask( ){
todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = this.name;
    const inputValue = input.value;

    if(inputValue === ""){
        alert("wirte a todo")
    }else {
        const task = {
            id: new Date().getTime(),
            name: inputValue,
            isCompleted: false
        };
        tasks.push(task);
        createTask(task);
        console.log(task);
       
    }

    input.focus();
});

function createTask(task) {
    const taskEl = document.createElement("li");
    taskEl.setAttribute("id", task.id);
    const taskElMarkup = `
      <div class="checkbox-wrapper">
        <input type="checkbox" id="${task.name}-${task.id}" name="tasks" ${
      task.isCompleted ? "checked" : ""
    }>
        <label for="${task.name}-${task.id}">
          <svg class="checkbox-empty">
            <use xlink:href="#checkbox_empty"></use>
          </svg>
          <svg class="checkmark">
            <use xlink:href="#checkmark"></use>
          </svg>
        </label>
        <span ${!task.isCompleted ? "contenteditable" : ""}>${task.name}</span>
      </div>
      <button class="remove-task" title="Remove ${task.name} task">
        <svg>
          <use xlink:href="#close"></use>
        </svg>
      </button>
    `;
    taskEl.innerHTML = taskElMarkup;
    listContainer.appendChild(taskEl);
    //countTasks();
  }

  /* function countTasks() {
    totalTasks.textContent = tasks.length;
    const completedTasksArray = tasks.filter((task) => task.isCompleted === true);
    completedTasks.textContent = completedTasksArray.length;
    remainingTasks.textContent = tasks.length - completedTasksArray.length;
  } */