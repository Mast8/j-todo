
const listContainer = document.getElementById("list"); 
const todoForm = document.querySelector(".todo-form");

const totalTasks = document.querySelector(".total-tasks span");
const completedTasks = document.querySelector(".completed-tasks span");
const remainingTasks = document.querySelector(".remaining-tasks span");

const percentage = document.querySelector(".percentage");
const dateNow = document.querySelector(".dateToday");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//date
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var now = new Date(); 
dateNow.textContent = now.toLocaleDateString("en-US", options);


if (localStorage.getItem("tasks")) {
  tasks.map((task) => {
    createTask(task);
  });
}

todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = this.name;
    const inputValue = input.value;

    //color generator
    var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});


    if(validate(inputValue)){
      const date = new Date();
      
      let custom_date =  (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() ;
        const task = {
            id: new Date().getTime(),
            name: inputValue,
            date: custom_date,
            isCompleted: false,
            color: randomColor

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
    showError('To do is blank');
  else if(input.trim().length < 3 ){
    showError('To do is too short');
    //alert("Todo is too short");
  } else {
        res = true;
        showElement("small", 'none');
    }
  return res;

}

function showError(input, message) {
    const small = document.querySelector('small');
    small.innerText = message;
}

function showElement(element, none){
    document.querySelector(element).style.display=none;
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
      <div class="checkbox-wrapper" style="background:${task.color}"
      >
        <input type="checkbox" id="${task.name}-${task.id}" class="checkbox" name="tasks"  ${
      task.isCompleted ? "checked" : "" 
    }>
        <label for="${task.name}-${task.id}">
          <div class="checkbox-empty"></div>

        </label>
       
        <span class="title" ${!task.isCompleted ? "contenteditable" : ""}>${task.name}   </span>
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
    let classLI = task.isCompleted ? "completed" : "progress";
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