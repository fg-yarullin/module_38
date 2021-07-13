import { User } from "./models/User";
import { Task } from "./models/Task";
import { appState } from "./app";
import { tasks } from "./data/tasks";

export const getFromStorage = function(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function(obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

// export const generateTestUser = function(User) {
//   localStorage.clear();
//   const testUser = {name: "test", password: "qwerty123", role: "user"};
//   // const testUser = new User("test", "qwerty123", "user");
//   // User.save(testUser);
//   generarteUser(User, testUser);
// };

export const generateUsers = function() {
  localStorage.clear();
  const adminUser = {name: "admin", password: "qwerty123", role: "admin"};
  generarteUser(User, adminUser);
  const testUser = {name: "test", password: "qwerty123"};
  generarteUser(User, testUser);
}

export const generarteUser = function(User, userData) {
  const user = new User(userData.name, userData.password, userData.role || "user");
  User.save(user);
}

export const generateTestTasks = function(userId) {
  tasks.forEach(task => {
    const newTask = new Task(userId, task.text);
    Task.save(newTask);
  });
}

export const renderTasks = function(tasks) {
  const cards = document.querySelectorAll('.card-body');
  if (tasks.length === 0) return;
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < tasks.length; j++) { {
        if (tasks[j].statusId == i + 11) {
          appendTask(cards[i], tasks[j])
        }
      }
    }
  }
};

export const addTask = function() {
    const addTaskBtn = document.querySelector('.add-task-btn');
    const submitBtn = document.querySelector('.submit-btn');
    let listener;
    addTaskBtn.addEventListener('click', listener = () => {
      appendTextArea();
      const taskTextBox = document.querySelector('.task-text-box');
      taskTextBox.scrollIntoView({behavior: 'smooth', block: 'end'});
      addTaskBtn.classList.add("d-none");
      submitBtn.classList.remove("d-none");
      addTaskBtn.removeEventListener('click', listener, true);
    });
    submitBtn.addEventListener('click', listener = () => {
      const taskTextBox = document.querySelector('.task-text-box');
      if (appState.currentUser) {
        const task = new Task(appState.currentUser.id, taskTextBox.value);
        Task.save(task);
        appState.task = task;
        appendTask(document.querySelector(".card-body"), task);
        appendDropDownMenuItems([task]);
      }
      addTaskBtn.classList.remove("d-none");
      submitBtn.classList.add("d-none");
      removeTextArea();
      submitBtn.removeEventListener('click', listener, true);
    });
};

function appendTask(taskParentNode, taskObj) {
  const paragraph = document.createElement('p');
  paragraph.className = 'card-text';
  paragraph.id = "task" + taskObj.id;
  paragraph.innerText =  taskObj.text;
  taskParentNode.appendChild(paragraph);
}

function appendTextArea() {
  const card = document.querySelector('.card-body');
  const taskTextBox = document.createElement('textarea');
  taskTextBox.classList.add('card-text', 'task-text-box');
  card.appendChild(taskTextBox);
}

function removeTextArea() {
  const card = document.querySelector('.card-body');
  const taskTextBox = document.querySelector('.task-text-box');
  card.removeChild(taskTextBox);
}

export const appendDropDownMenuItems = function(tasks) {
  const dropDownMenus = document.querySelectorAll('.card-dropdown-menu');
  const taskStatuses = ["backlog", "ready", "in_progress"];
  for (let i = 0; i < dropDownMenus.length; i++) {
    tasks.forEach(task => {
      if (task.status === taskStatuses[i]) {
        const li = document.createElement('li');
        const dropDownMenuItem = document.createElement('a');
        li.id = "li" + task.id;
        dropDownMenuItem.className = "dropdown-item";
        dropDownMenuItem.href = "#";
        dropDownMenuItem.innerText = task.text;
        li.appendChild(dropDownMenuItem);
        dropDownMenus[i].appendChild(li);
      }
    });
  }
}

export const renderAdminMenuItems = function () {
  const navBarNav = document.querySelector(".navbar-nav");
  const adminMenu = ['Users', 'All Tasks'];
  adminMenu.forEach(element => {
    const li = document.createElement("li");
    const navLink = document.createElement("a");
    li.className = "nav-item admin-menu-item";
    navLink.className = "nav-link";
    navLink.href = "#";
    navLink.innerText = element;
    navBarNav.appendChild(li).appendChild(navLink);
  }) 
}

export const removeAdminMenuItems = function () {
  if (appState.currentUser.role === "admin") {
    const navBarNav = document.querySelector(".navbar-nav");
    const adminMenuItems = document.querySelectorAll(".admin-menu-item");
    if (adminMenuItems.length > 0) {
      adminMenuItems.forEach(item => navBarNav.removeChild(item));
    }
  }
}

export const changeTaskStatus = function() {
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  for (let i = 0; i < dropdownItems.length; i++) {
    dropdownItems[i].addEventListener("click", function(e) {
      e.preventDefault();
      console.log(dropdownItems[i].parentNode.id);
      console.log(dropdownItems[i].lastChild);
    });
  }
}