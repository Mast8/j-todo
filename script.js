
const listContainer = document.getElementById("list"); 
const todoForm = document.querySelector(".todo-form");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
  tasks.map((task) => {
    createTask(task);
  });
}

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
        localStorage.setItem("tasks", JSON.stringify(tasks));
        todoForm.reset();
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
          <div class="checkbox-empty">
            <use xlink:href="#checkbox_empty"></use>
          </div>
          <div class="checkmark">
            <use xlink:href="#checkmark"></use>
          </div>
        </label>
        <span ${!task.isCompleted ? "contenteditable" : ""}>${task.name}</span>
      </div>
      <button class="remove-task" title="Remove ${task.name} task">X
        
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
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }