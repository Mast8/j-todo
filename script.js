
const listContainer = document.getElementById("list"); 
const todoForm = document.querySelector(".todo-form");

const totalTasks = document.querySelector(".total-tasks span");
const completedTasks = document.querySelector(".completed-tasks span");
const remainingTasks = document.querySelector(".remaining-tasks span");

const percentage = document.querySelector(".percentage");

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

    if(validate(inputValue)){
      const date = new Date();
      let custom_date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
        const task = {
            id: new Date().getTime(),
            name: inputValue,
            date: custom_date,
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

function validate(input){
  res = false;
  if(input.trim() === "")
    alert("Todo is blank");

  else res = true;
  return res;
}

function liStatus(task){
  var classLI = task.isCompleted ? "completed" : "progress";
  return classLI;
}

function createTask(task) {
    const taskEl = document.createElement("li");
    taskEl.setAttribute("id", task.id);
    //change li class
    let classLI = liStatus(task);
    taskEl.className = classLI;

    const taskElMarkup = `
      <div class="checkbox-wrapper">
        <input type="checkbox" id="${task.name}-${task.id}" class="checkbox" name="tasks" ${
      task.isCompleted ? "checked" : ""
    }>
        <label for="${task.name}-${task.id}">
          <div class="checkbox-empty"></div>
         
        </label>
       
          
        <span ${!task.isCompleted ? "contenteditable" : ""}>${task.name}   </span>
         <label "contenteditable"> ${task.date} </label>
        <button class="remove-task" title="Remove ${task.name} ">X </button>
        </div>
      
    `;
    countTasks();
    
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
    countTasks();
  }

  listContainer.addEventListener("input", (e) => {
    const taskId = e.target.closest("li").id;
    updateTask(taskId, e.target);
  });
  
  function updateTask(taskId, el) {
    const task = tasks.find((task) => task.id === parseInt(taskId));
    //change class element
    let classLI = task.isCompleted ? "completed" : "progress";
    //el.closest("li").className = classLI;

    if (el.hasAttribute("contentEditable")) {
      task.name = el.textContent;
    } else {
        const span = el.nextElementSibling.nextElementSibling;
        task.isCompleted = !task.isCompleted;
        if (task.isCompleted) {
          span.removeAttribute("contenteditable");
          el.setAttribute("checked", "");
        } else {
          el.removeAttribute("checked");
          span.setAttribute("contenteditable", "");
        }
       
      }
    el.closest("li").className = classLI;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    countTasks();
  }

  function countTasks() {
    
    //Percentage of completed task
      totalTasks.textContent = tasks.length;
      const completedTasksArray = tasks.filter((task) => task.isCompleted === true);
      
      completedTasks.textContent = completedTasksArray.length;
      remainingTasks.textContent = tasks.length - completedTasksArray.length;
      showPercentage(completedTasksArray);
    
  }

  function showPercentage ( completedTasksArray) {
    if(getTasks()){
      round = Math.round((completedTasksArray.length/tasks.length)*100);
      round > 50 ? percentage.className = "percentage good" : percentage.className = "percentage bad" ; 
      percentage.textContent = round +"%";
    }
    else percentage.textContent = "";
  }

  function getTasks(){
    return tasks.length > 0;
  }