(function() {
  const toDoApp = document.querySelector(".ToDoApp__header");
  const newTask = document.querySelector(".ToDoApp__create");
  const taskContainer = document.querySelector(".ToDoApp__main");
  const clearAllBtn = document.querySelector(".ToDoApp__clear");
  const showAllTabs = document.querySelector("[data-tabs=all]");
  const showActiveTabs = document.querySelector("[data-tabs=active]");
  const showCompletedTabs = document.querySelector("[data-tabs=complited]");

  const createTaskContent = function(toDoItem,text) {
    const toggleBlock = document.createElement("div");
    toggleBlock.classList.add("check");

    const toggle = document.createElement("label");
    toggle.classList.add("toggle");

    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.setAttribute("type", "checkbox");

    const toogleIcons = document.createElement("div");
    toogleIcons.classList.add("toggleIcon");

    toggle.appendChild(toogleIcons);
    toggle.appendChild(checkbox);
    toggleBlock.appendChild(toggle);
    toDoItem.appendChild(toggleBlock);

    const taskText = document.createElement("div");
    taskText.classList.add("task-text");
    taskText.innerHTML = text;
    toDoItem.appendChild(taskText);
    
    const removeBtn = document.createElement("div");
    removeBtn.classList.add("remove");
    removeBtn.innerHTML = "✕";
    toDoItem.appendChild(removeBtn);

    removeBtn.addEventListener("click", destroyTask);
  };

  const createTask = function(text) {
    const toDoList = document.querySelector(".ToDoApp__list"); // ul.
    const createItems = document.createElement("li"); // create li - items
    createItems.setAttribute("data-status", "active"); // set data atribute for li - items
    createItems.classList.add("ToDoApp__item"); // set class name for li - items
    toDoList.appendChild(createItems); // pul (list = li) in our ul.

    createTaskContent(createItems,text);
  };

  const updateCounter = function() {
    const counter = document.querySelector("[data-counter]");
    const activeTasks = document.querySelectorAll("[data-status=active]").length;
    counter.innerHTML = activeTasks;
  };

  const compliteTasks = function() {
    const toDoList = document.querySelector(".ToDoApp__list");
    toDoList.addEventListener("click", function(event) {
      if (event.target.classList.contains("checkbox")) {
        let toggleItem = event.target.closest("[data-status]");
        let fontTransformation = toggleItem.querySelector('.task-text');
        let changeToggleIcons = event.target.parentElement.querySelector(".toggleIcon");
        if (event.target.checked) {
          toggleItem.dataset.status = "complited";
          changeToggleIcons.classList.add('toogleCompleted');
          fontTransformation.classList.add('complited');
        } else {
          toggleItem.dataset.status = "active";
          changeToggleIcons.classList.remove('toogleCompleted');
          fontTransformation.classList.remove('complited');
        }
      }
      updateCounter();
    });
  };
  const destroyTask = function() {
    this.parentElement.remove();
    updateCounter();
  }; 

  const createArrow = function() {
    const arrowExist = !!toDoApp.querySelector('.ToDoApp__arrow');
    if(arrowExist) {
      return;
    }
    const arrow = document.createElement("div");
    arrow.classList.add("ToDoApp__arrow");
    arrow.innerHTML = "❯";
    toDoApp.insertBefore(arrow, newTask);
    
    arrow.addEventListener("click", function() {
      const allTasks = document.querySelectorAll("[data-status]");
      const allTasksText = document.querySelectorAll(".task-text");
      const allCheckBox = document.querySelectorAll(".checkbox");
      const allToggleIcons = document.querySelectorAll(".toggleIcon");
      for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].dataset.status === "active") {
          allTasks[i].dataset.status = "complited";
          allTasksText[i].classList.add("complited");
          allToggleIcons[i].classList.add('toogleCompleted');
          allCheckBox[i].checked = true;
        } else {
          allTasks[i].dataset.status = "active";
          allTasksText[i].classList.remove("complited");
          allCheckBox[i].checked = false;
          allToggleIcons[i].classList.remove('toogleCompleted');;
        }
      }
      updateCounter();
    });
    
  };

  clearAllBtn.addEventListener("click", function() {
    let allComplitedTasks = document.querySelectorAll("[data-status=complited]");
    for (let j = 0; j < allComplitedTasks.length; j++) {
      allComplitedTasks[j].remove();
    }
  });
  showAllTabs.addEventListener("click", function() {
    const filterItems = document.querySelectorAll("[data-status]");
    for (let j = 0; j < filterItems.length; j++) {
      filterItems[j].classList.remove("hide");
    }
  });
  showActiveTabs.addEventListener("click", function() {
    const filterItems = document.querySelectorAll("[data-status]");
    for (let j = 0; j < filterItems.length; j++) {
      if (filterItems[j].dataset.status != "active") {
        filterItems[j].classList.add("hide");
      } else {
        filterItems[j].classList.remove("hide");
      }
    }
  });
  showCompletedTabs.addEventListener("click", function() {
    const filterItems = document.querySelectorAll("[data-status]");
    for (let j = 0; j < filterItems.length; j++) {
      if (filterItems[j].dataset.status != "complited") {
        filterItems[j].classList.add("hide");
      } else {
        filterItems[j].classList.remove("hide");
      }
    }
  });

  newTask.addEventListener("keydown", function(key) {
    if (key.keyCode === 13) {
      if (newTask.value != "") {
        createArrow();
        createTask(newTask.value);
        updateCounter();
        compliteTasks();
        if (taskContainer.classList.contains("hide")) {
          taskContainer.classList.remove("hide");
        }
        newTask.value = "";
      }
    }
  });
})();
const stylesString = `
  background-color: #fff;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  clear: both;
  cursor: pointer;
  float: left;
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  height: 42px;
  line-height: 40px;
  outline: 0;
  padding-left: 18px;
  padding-right: 30px;
  position: relative;
  text-align: left !important;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
  width: auto;
`;
var raws = stylesString.split(';');
var result = {};

for(var i = 0; i < raws.length; i++){
	var	raw = raws[i].split(':');
	var property = raw[0];
	property = property.replace(/\s/g, '');
	var value = raw[1];
	console.log('value:', value);
	value = value.replace(/\s/g, '');
	result[property] = value;
	
}
console.log(result);


