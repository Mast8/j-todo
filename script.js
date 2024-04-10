
const listContainer = document.getElementById("list"); 
const todoForm = document.querySelector(".todo-form");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = this.name;
    const inputValue = input.value;

    if(inputValue === ""){
        alert("Write a todo")
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

  }

  listContainer.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("remove-task") ||
      e.target.parentElement.classList.contains("remove-task")
    ) {
      const taskId = e.target.closest("li").id;
      removeTask(taskId);
    }
  });

  function removeTask(taskId) {
    tasks = tasks.filter((task) => task.id !== parseInt(taskId));
    document.getElementById(taskId).remove();
  }